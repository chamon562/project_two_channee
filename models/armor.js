'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class armor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.armor.belongsTo(models.user)
      models.armor.hasMany(models.comment)
    }
  };
  armor.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    apiId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'armor',
  });
  return armor;
};