const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect");

const Coupon = sequelize.define("Coupon", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // HOA83
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  type: {
    type: DataTypes.ENUM("percent", "money"),
    allowNull: false,
    defaultValue: "percent",
  },

  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Coupon;
