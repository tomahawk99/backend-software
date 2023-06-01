'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Availabilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Fields,{
        as: 'fieldId',
        foreignKey: 'fieldId',
      });
      this.hasMany(models.Bookings,{
        foreignKey: 'availabilityId'
      });
    }
  }
  Availabilities.init({
    timestart: DataTypes.DATE,
    timeend: DataTypes.DATE,
    available: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Availabilities',
  });
  return Availabilities;
};