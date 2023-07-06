const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect");
const User = require("./User");

// status: pending, approved, delivery, done, rejected
const Order = sequelize.define("Order", {
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
});

module.exports = Order;
