const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql/connect");
const Role = require("./Role");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    defaultValue: "customer",
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Role,
      key: "slug",
    },
  },
});

module.exports = User;
