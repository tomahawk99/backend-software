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
        type: 'player',
        password: '$2a$05$yUuSEPQqtRB5QfacCJvzseqR4L4fk.eQ.gCi1ZPZwrICdcDsOggEe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 0,
        name: 'ADMIN',
        lastName: '',
        email: 'admin@admin.cl',
        type: 'admin',
        password: '$2a$05$yUuSEPQqtRB5QfacCJvzseqR4L4fk.eQ.gCi1ZPZwrICdcDsOggEe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Jorge',
        lastName: 'Gonzalez',
        email: 'jorgegonzalez@gmail.com',
        type: 'owner',
        password: '$2a$05$yUuSEPQqtRB5QfacCJvzseqR4L4fk.eQ.gCi1ZPZwrICdcDsOggEe',
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

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),

};
