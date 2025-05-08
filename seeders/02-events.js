module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Events', [{
        name: 'Summer Music Festival',
        date: new Date('2024-07-15'),
        location: 'Central Park',
        price: 500000,
        ticketsAvailable: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Tech Conference 2024',
        date: new Date('2024-09-20'),
        location: 'Convention Center',
        price: 1000000,
        ticketsAvailable: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Events', null, {});
    }
  };