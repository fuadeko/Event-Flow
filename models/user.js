'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile);
      User.hasMany(models.Transaction);
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'email cant be empty!!'
          },
          notNull: {
            args: true,
            msg: 'email cant be empty!!'
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'password cant be empty!!'
          },
          notNull: {
            args: true,
            msg: 'password cant be empty!!'
          }
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};