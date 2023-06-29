const Address = require("./Address");
const User = require("./User");

// 1-1
User.hasOne(Address, {
  foreignKey: "userEmail",
});
Address.belongsTo(User, {
  foreignKey: "userEmail",
});
