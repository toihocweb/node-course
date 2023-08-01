// const User = require("../models/mongo/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const { ErrorResponse } = require("../response/ErrorResponse");
const User = require("../models/mysql/User");
const Address = require("../models/mysql/Address");
const mail = require("../services/mail");
const { generateOtp } = require("../utils/otp");
const RegisterOtp = require("../models/mongo/RegisterOtp");
const { hashPassword } = require("../utils/hashPassword");

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

  const hashedPassword = hashPassword(password);

  const user = await User.create({
    username,
    email,
    phone,
    password: hashedPassword,
  });

  // const otp = generateOtp();

  // const registerOtp = new RegisterOtp({
  //   email,
  //   otp,
  // });

  await Promise.all([
    // registerOtp.save(),
    Address.create({
      city: "",
      address: "",
      province: "",
      zip: "",
      userId: user.id,
    }),
    // mail.sendMail({
    //   to: email,
    //   subject: "Your OTP",
    //   html: `<h1>Your OTP Code: ${otp}</h1>`,
    // }),
  ]);

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

const verifyOtp = asyncMiddleware(async (req, res, next) => {
  const { otp, email } = req.body;

  const user = await RegisterOtp.findOne({
    email,
  });

  if (!user) {
    throw new ErrorResponse(401, "Unauthorized");
  }

  if (user.otp !== otp) {
    throw new ErrorResponse(400, "Can not verify otp");
  }

  const updateUser = User.update(
    {
      isVerified: true,
    },
    {
      where: {
        email,
      },
    }
  );

  const deleteOTp = RegisterOtp.deleteOne({
    email,
  });

  await Promise.all([updateUser, deleteOTp]);

  res.json({
    success: true,
    message: "Verify otp successfully",
  });
});

module.exports = {
  register,
  login,
  verifyOtp,
};
