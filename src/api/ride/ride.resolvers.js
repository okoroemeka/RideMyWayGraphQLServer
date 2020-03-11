import Sequelize from 'sequelize';
import checkFields from '../../utils/checkFields';
import userAuth from '../../utils/userAuth';

const Op = Sequelize.Op;

const createRideHelper = (input, model, userId) => {
  return model.create({
    pickup:input.pickup.toLowerCase(),
    departure:input.departure.toLowerCase(),
    destination: input.destination.toLowerCase(),
    capacity: input.capacity,
    carColor: input.carColor.toLowerCase(),
    carType: input.carType.toLowerCase(),
    plateNumber: input.plateNumber,
    userId
  });
};

const createRide = (_, { input }, ctx, info) => {
  checkFields(input);
  const { userId } = ctx.request;
  if (!userId) throw new Error('Please login to continue');
  userAuth(ctx);
  return createRideHelper(input, ctx.models.ride, userId);
};
/**
 *
 * @param {object} input
 * @param {object} model
 * @returns {Array} rides
 */
const getRidesHelper = (input, model) => {
  return model.findAll({
    where: {
      pickup: input.pickup.toLowerCase(),
      destination: { [Op.startsWith]: input.destination.toLowerCase() }
    },
    attributes: [
      'id',
      'pickup',
      'destination',
      'departure',
      'capacity',
      'carColor',
      'carType',
      'plateNumber',
      'userId'
    ]
  });
};
/**
 * @param {*} _
 * @param {object} input
 * @param {object} ctx
 * @param {object} info
 * @returns {array}
 */
const getRides = (_, { input }, ctx, info) => {
  checkFields(input);
  return getRidesHelper(input, ctx.models.ride);
};

export default {
  Query: {
    getRides
  },
  Mutation: {
    createRide
  },
  Ride:{
    user(ride, _, ctx){
      return ctx.models.users.findOne({
        where: {
          id: ride.userId
        }
      });
    }
  }
};
