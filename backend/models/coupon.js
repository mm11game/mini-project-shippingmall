"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Coupon.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Coupon.init(
    {
      user_id: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      value: DataTypes.STRING,
      state: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Coupon",
    }
  );
  return Coupon;
};
