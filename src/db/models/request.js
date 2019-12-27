export default (sequelize, DataTypes) => {
  const request = sequelize.define(
    'request',
    {
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  request.associate = models => {
    // associations can be defined here
    request.belongsTo(models.ride, {
      foreignKey: 'rideId',
      as: 'rideRequests',
      onDelete: 'CASCADE',
      allowNull: false
    });
  };
  request.associate = models => {
    // associations can be defined here
    request.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      allowNull: false
    });
  };
  return request;
};
