'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      Event.hasMany(models.Transaction);
      Event.belongsToMany(models.EventCategory, {
        through: 'EventEventCategories'});
    }

    
  }
  Event.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    price: DataTypes.INTEGER,
    ticketsAvailable: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};