const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect");
const User = require("./User");

const Address = sequelize.define("Address", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  province: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Address;
