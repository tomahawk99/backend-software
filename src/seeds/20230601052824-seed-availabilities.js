'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Availabilities',[
      {
        id: 91,
        fieldId: 14,
        timestart: new Date(2023,6,1,10),
        timeend: new Date(2023,6,1,11),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 92,
        fieldId: 13,
        timestart: new Date(2023,6,1,10),
        timeend: new Date(2023,6,1,11),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 93,
        fieldId: 14,
        timestart: new Date(2023,6,1,11),
        timeend: new Date(2023,6,1,12),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 94,
        fieldId: 13,
        timestart: new Date(2023,6,1,11),
        timeend: new Date(2023,6,1,12),
        available: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface) => queryInterface.bulkDelete('Availabilities', null, {}),
};
