const Address = require("./Address");
const Category = require("./Category");
const Product = require("./Product");
const Role = require("./Role");
const User = require("./User");

// user - address
User.hasOne(Address, {
  foreignKey: "userId",
});
Address.belongsTo(User, {
  foreignKey: "userId",
});

// product - category
Category.hasMany(Product, {
  foreignKey: "categoryId",
});
Product.belongsTo(Category, {
  foreignKey: "categoryId",
});

// user - role
User.belongsTo(Role, {
  foreignKey: "role",
});

Role.hasMany(User, {
  foreignKey: "role",
});