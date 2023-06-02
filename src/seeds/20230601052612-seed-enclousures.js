'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Enclousures',[
      {
        id: 15,
        ownerId: 2,
        name: 'Deportes UC',
        address: 'Vicuna Mackena 1314',
        district: 'Macul',
        phoneNumber: '+56290755252',
        socialMedia: '@deportesuc',
        email: 'deportes@uc.cl',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: (queryInterface) => queryInterface.bulkDelete('Enclousures', null, {}),

};
