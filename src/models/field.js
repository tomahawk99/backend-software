'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fields extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.enclousures,{
        as: 'enclousure_Id',
        foreignKey: 'enclousureid',
      });
    }
  }
  fields.init({
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    maxplayers: DataTypes.INTEGER,
    minplayers: DataTypes.INTEGER,
    playeramount: DataTypes.INTEGER,
    ownerid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'fields',
  });
  return fields;
};