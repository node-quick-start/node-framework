'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
  	name: DataTypes.STRING,
    username: {
    	type: DataTypes.STRING,
	    allowNull: false,
	    unique: true,
	    // http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations
	    validate: {
		    len: [3, 30]
	    }
    },
    email: {
    	type: DataTypes.STRING,
	    unique: true
    },
	  // Timestamps
	  created_at: {
  		type: DataTypes.DATE,
		  get () {
  			return this.getDataValue('created_at').toString()
		  }
	  },
	  updated_at: {
		  type: DataTypes.DATE,
		  get () {
			  return this.getDataValue('created_at').toString()
		  }
	  },
  }, {
		underscored: true,
	});
  User.associate = function(models) {
    // associations can be defined here
		User.hasOne(models.Wallet);
  };
  return User;
};