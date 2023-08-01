const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect");
const User = require("./User");
const Coupon = require("./Coupon");

// status: pending, approved, delivered, done, cancelled
const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      allowNull: false,
    },

    received_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    cancelledReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    cancelledBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },

    couponId: {
      type: DataTypes.INTEGER,
      references: {
        model: Coupon,
        key: "id",
      },
    },
  },
  {
    paranoid: true,
    tableName: "orders",
  }
);
  
module.exports = Order;
