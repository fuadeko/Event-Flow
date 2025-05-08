module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [{
        email: 'user@mail.com',
        password: '$2a$10$H7L3Ybq7J9Z6U1qkQx9sE.9qW1mY5Vz0JkX5rYd3Lv8h1sS5rYd3L', // password: 123456
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        email: 'admin@mail.com',
        password: '$2a$10$H7L3Ybq7J9Z6U1qkQx9sE.9qW1mY5Vz0JkX5rYd3Lv8h1sS5rYd3L', // password: 123456
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  
      await queryInterface.bulkInsert('Profiles', [{
        fullName: 'John Doe',
        phone: '08123456789',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        fullName: 'Admin User',
        phone: '08987654321',
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
      await queryInterface.bulkDelete('Profiles', null, {});
    }
  };