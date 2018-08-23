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
      username: {
        type: Sequelize.STRING,
				allowNull: false,
				unique: true
      },
      email: {
        type: Sequelize.STRING,
				unique: true
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
    }).then(() => queryInterface.addIndex('Users', ['username']))
			.then(() => queryInterface.addIndex('Users', ['email']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};