const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect");
const Order = require("./Order");
const Product = require("./Product");

const OrderProduct = sequelize.define(
  "order_products",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    tableName: "order_products",
  }
);

module.exports = OrderProduct;
