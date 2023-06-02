'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Fields',[
      {
        id: 13,
        enclousureId: 15,
        number: 1,
        maxPlayers: 20,
        minPlayers: 10,
        playerAmount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        enclousureId: 15,
        number: 2,
        maxPlayers: 20,
        minPlayers: 10,
        playerAmount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface) => queryInterface.bulkDelete('Fields', null, {}),

};
