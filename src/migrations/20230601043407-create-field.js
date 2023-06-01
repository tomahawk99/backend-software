'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fields', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      enclousureId: {
        type: Sequelize.INTEGER,
        references: {model: 'Enclousures', key: 'id'}
      },
      number: {
        type: Sequelize.INTEGER
      },
      maxPlayers: {
        type: Sequelize.INTEGER
      },
      minPlayers: {
        type: Sequelize.INTEGER
      },
      playerAmount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fields');
  }
};