'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ratings.init({
    ratedid: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ratings',
  });
  return ratings;
};