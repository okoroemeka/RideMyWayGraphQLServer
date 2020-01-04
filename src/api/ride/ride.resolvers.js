import checkFields from '../../utils/checkFields';
import userAuth from '../../utils/userAuth';
import { findRideById, findRideRequestById } from '../../utils/queryHelper';
const createRideHelper = (input, model, userId) => {
  return model.create({
    ...input,
    userId
  });
};

const createRide = (_, { input }, ctx, info) => {
  checkFields(input);
  const { userId } = ctx.request;
  if (!userId) throw new Error('Please login to continue');
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
      ...input
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
  }
};
