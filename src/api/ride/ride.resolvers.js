import checkFields from '../../utils/checkFields';

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

export default {
  Mutation:{
    createRide,
  }
}