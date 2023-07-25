const crypto = require("crypto");

const randomBytes = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

module.exports = {
  randomBytes,
};
