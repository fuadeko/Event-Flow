module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('EventEventCategories', [{
        EventId: 1,
        EventCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        EventId: 2,
        EventCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('EventEventCategories', null, {});
    }
  };