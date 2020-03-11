// import checkFields from '../../utils/checkFields';
import userAuth from '../../utils/userAuth';
import { findRideById, findRideRequestById, rideTableOptions } from '../../utils/queryHelper';

/**
 * @param {*} _
 * @param {object} input
 * @param {object} ctx
 * @param {object} info
 * @returns {object}
 */
const respondToRideRequest = async (_, { input }, ctx, info) => {
  userAuth(ctx);
  const { models } = ctx;
  const { rideId, requestId, approved } = input;
  const ride = await findRideById(models, rideId, rideTableOptions);
  if (!ride) throw new Error('This ride offer no longer exists');
  if (ride.dataValues.capacity < 1)
    throw new Error('This ride is full already');
  const { approved: checkStatus } = findRideRequestById(models, requestId);
  if (checkStatus !== approved) {
    await models.request.update(
      { approved },
      { where: { id: requestId, rideId } }
    );
    if (approved === true) {
      await models.ride.update(
        { capacity: ride.dataValues.capacity - 1 },
        {
          where: {
            id: rideId
          }
        }
      );
    }
  }
  return {
    text: `Ride ${approved ? 'accepted' : 'rejected'} successfully`
  };
};
/**
 * @param {*} _
 * @param {object} input
 * @param {object} ctx
 * @param {object} info
 * @returns {object} requests
 */
const getRideRequests = async (_, { input }, ctx, info) => {
  try {
    let rideId = input.rideId;
    const { models, request:{userId} } = ctx;
    userAuth(ctx);
    if (!rideId) {
      const ride = await models.ride.findAll({
        where: {
          userId
        },
        attributes: ['id'],
        order: [['createdAt', 'DESC']],
        limit: 1
      });
      if (ride.length === 0) {
        return []
      }
      rideId = ride[0].dataValues.id;
    }
    const requests = await models.request.findAll({
      where: {
        rideId,
      }
    });
    return requests;
  } catch (error) {
    throw new Error('Error occured, please try again later')
  }
  
};

const joinRide = async (_, { input }, ctx, info) => {
  userAuth(ctx);
  // const { models } = ctx;
  const { models, request:{userId} } = ctx;
  // const { userId } = ctx.request;
  const { rideId } = input;
  const check = await models.request.findOne({
    where: {
      rideId,
      userId
    }
  });
  if (check) {
    throw new Error('You have already joined this ride');
  }
  const request = await models.request.create({
    rideId,
    userId
  });
  return request;
};
export default {
  Query: {
    getRideRequests
  },
  Mutation: {
    respondToRideRequest,
    joinRide
  },
  RideRequest: {
    user(request, _, ctx) {
      return ctx.models.users.findOne({
        where: {
          id: request.userId
        }
      });
    },
    ride(request, _, ctx) {
      return ctx.models.ride.findOne({
        where: {
          id: request.rideId
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
    }
  }
};
