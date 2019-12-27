const findRideRequestById = async (models, queryParam, options = {}) => {
  const response = await models.request.findByPk(queryParam, options);
  return response;
};
const findRideById = async (models, queryParam, options = {}) => {
  const response = await models.ride.findByPk(queryParam, options);
  return response;
};
const rideTableOptions = {
  attributes: [
    'id',
    'destination',
    'departure',
    'capacity',
    'carColor',
    'carType',
    'plateNumber',
    'userId'
  ]
};
export { findRideRequestById, findRideById, rideTableOptions };
