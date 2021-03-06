'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      username: {
        type: Sequelize.STRING,
				allowNull: false
      },
      email: {
        type: Sequelize.STRING
      },
			created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
			updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci',
			timestamps: true
    }).then(() => queryInterface.addIndex('Users', ['username'], {
    	  indicesType: 'UNIQUE'
		    // indexName: 'composite_index'
	    }
    )).then(() => queryInterface.addIndex('Users', ['email'], {
	      indicesType: 'UNIQUE'
				// indexName: 'composite_index'
			}
		));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};