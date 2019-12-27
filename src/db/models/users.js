export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  users.associate = function(models) {
    // associations can be defined here
    users.hasOne(models.ride, {
      foriegnKey: 'userId',
      as: 'ride'
    });
    users.hasMany(models.request, {
      foriegnKey: 'userId',
      as: 'requests'
    });
  };
  return users;
};
