'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
		underscored: true,
	});
  User.associate = function(models) {
    // associations can be defined here
		User.hasOne(models.Wallet);
  };
  return User;
};