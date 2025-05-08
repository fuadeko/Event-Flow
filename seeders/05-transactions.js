module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Transactions', [{
        quantity: 2,
        status: 'success',
        UserId: 1,
        EventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        quantity: 1,
        status: 'pending',
        UserId: 1,
        EventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Transactions', null, {});
    }
  };