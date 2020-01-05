// import checkFields from '../../utils/checkFields';
import userAuth from '../../utils/userAuth';
import { findRideById, findRideRequestById } from '../../utils/queryHelper';

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
const getRideRequests = async (_, { input }, ctx, info) => {
  const { rideId } = input;
  const { models } = ctx;
  userAuth(ctx);
  // if (!userId) {
  //   throw new Error('Please login to continue');
  // }
  const requests = await models.request.findAll({
    where: {
      rideId
    }
  });
  return requests;
};
export default {
  Query: {
    getRideRequests
  },
  Mutation: {
    respondToRideRequest
  }
};
