// const User = require("../models/mongo/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const { ErrorResponse } = require("../response/ErrorResponse");
const User = require("../models/mysql/User");
const Address = require("../models/mysql/Address");

const register = asyncMiddleware(async (req, res, next) => {
  const { username, email, password, phone } = req.body;

  // check email
  const isExistedEmail = await User.findOne({
    where: {
      email,
    },
  });
  if (isExistedEmail) {
    throw new ErrorResponse(409, "Email is already existed");
  }

  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User.create({
    username,
    email,
    phone,
    password: hashedPassword,
  });

  // create address
  await Address.create({
    city: "",
    address: "",
    province: "",
    zip: "",
    userId: user.id,
  });

  res.status(201).json({
    success: true,
  });
});

const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ErrorResponse(401, "Unauthorized");
  }

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    throw new ErrorResponse(401, "Unauthorized");
  }

  // tao jsonwebtoken
  const token = jwt.sign(
    {
      id: user.id,
    },
    env.SECRET_KEY,
    {
      expiresIn: env.EXPIRED_IN,
    }
  );

  res.json({
    success: true,
    token,
  });
});

module.exports = {
  register,
  login,
};
