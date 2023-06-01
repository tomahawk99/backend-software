'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users,{
        as: 'playerId',
        foreignKey: 'playerId',
      });
      this.belongsTo(models.Availabilities,{
        as: 'availabilityId',
        foreignKey: 'availabilityId',
      });
      this.belongsTo(models.Fields,{
        as: 'fieldId',
        foreignKey: 'fieldId',
      });
    }
  }
  Bookings.init({
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};