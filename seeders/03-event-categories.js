module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('EventCategories', [{
        name: 'Music',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Conference',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Sports',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('EventCategories', null, {});
    }
  };