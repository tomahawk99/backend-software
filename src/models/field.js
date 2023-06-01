'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fields extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Enclousures,{
        as: 'enclousureId',
        foreignKey: 'enclousureId',
      });
      this.hasMany(models.Bookings,{
        foreignKey: 'fieldId'
      });
      this.hasMany(models.Availabilities,{
        foreignKey: 'fieldId'
      });
    }
  }
  Fields.init({
    number: DataTypes.INTEGER,
    maxPlayers: DataTypes.INTEGER,
    minPlayers: DataTypes.INTEGER,
    playerAmount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fields',
  });
  return Fields;
};