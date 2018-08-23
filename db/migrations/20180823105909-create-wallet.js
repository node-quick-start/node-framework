'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				}
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
				defaultValue: 0
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
			timestamps: true,
		});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Wallets');
  }
};