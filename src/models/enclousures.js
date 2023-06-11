'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enclousures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users,{
        as: 'owner_Id',
        foreignKey: 'ownerId',
      });
      this.hasMany(models.Fields,{
        foreignKey: 'fieldId'
      });
    }
  }
  Enclousures.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    district: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    socialMedia: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Enclousures',
  });
  return Enclousures;
};