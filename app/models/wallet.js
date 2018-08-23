'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    amount: DataTypes.DECIMAL
  }, {
		underscored: true,
	});
  Wallet.associate = function(models) {
    // associations can be defined here
		Wallet.belongsTo(models.User);
  };
  return Wallet;
};