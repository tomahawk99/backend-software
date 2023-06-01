'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users',[
      {
        id: 1,
        name: 'Tomas',
        lastName: 'Concha',
        email: 'tomas.concha@uc.cl',
        type: 'player'
      },
      {
        id: 0,
        name: 'ADMIN',
        lastName: '',
        email: 'admin@admin.cl',
        type: 'admin'
      },
      {
        id: 2,
        name: 'Jorge',
        lastName: 'Gonzalez',
        email: 'jorgegonzalez@gmail.com',
        type: 'owner'
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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
