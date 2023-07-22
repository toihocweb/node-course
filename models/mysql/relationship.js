const Address = require("./Address");
const Category = require("./Category");
const Coupon = require("./Coupon");
const Order = require("./Order");
const OrderProduct = require("./OrderProduct");
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

// Order - Product
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: "orderId",
});
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "productId",
});

// Order - User
User.hasMany(Order, {
  foreignKey: "userId",
});
Order.belongsTo(User, {
  foreignKey: "userId",
});

// Coupon - Order

Order.hasMany(Coupon, {
  foreignKey: "couponId",
});

Coupon.belongsTo(Order, {
  foreignKey: "couponId",
});
