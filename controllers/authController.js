const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const { ErrorResponse } = require("../response/ErrorResponse");

const register = asyncMiddleware(async (req, res, next) => {
  const { username, email, password } = req.body;

  // check email
  const isExistedEmail = await User.findOne({ email });
  if (isExistedEmail) {
    throw new ErrorResponse(409, "Email is already existed");
  }

  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  // sequelize...

  res.status(201).json({
    success: true,
  });
});

const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

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
      username: user.username,
      id: user._id,
      email: user.email,
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
