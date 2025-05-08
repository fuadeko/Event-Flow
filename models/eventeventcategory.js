'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventEventCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventEventCategory.init({
    EventId: DataTypes.INTEGER,
    EventCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EventEventCategories',
  });
  return EventEventCategory;
};