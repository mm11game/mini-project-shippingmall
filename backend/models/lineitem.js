"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LineItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LineItem.belongsTo(models.Order, { foreignKey: "order_id" });
      LineItem.belongsTo(models.Item, { foreignKey: "item_id" });
    }
  }
  LineItem.init(
    {
      order_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      unitprice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "LineItem",
    }
  );
  return LineItem;
};
