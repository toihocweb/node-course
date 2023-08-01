const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect");
const User = require("./User");

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    province: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    zip: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "addresses",
  }
);

module.exports = Address;
