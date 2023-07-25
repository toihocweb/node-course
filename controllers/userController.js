const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const Address = require("../models/mysql/Address");
const User = require("../models/mysql/User");
const { ErrorResponse } = require("../response/ErrorResponse");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../utils/hashPassword");
const { randomBytes } = require("../utils/randomBytes");
const ForgotToken = require("../models/mongo/ForgotToken");
const mail = require("../services/mail");

const updateAddress = asyncMiddleware(async (req, res, next) => {
  const { city, address, province, zip } = req.body;
  const { id: userId } = req.user;

  const user = await Address.findOne({
    where: {
      userId,
    },
  });

  if (!user) {
    throw new ErrorResponse(404, "User not found");
  }

  await Address.update(
    {
      city,
      address,
      province,
      zip,
    },
    {
      where: {
        userId,
      },
    }
  );

  res.status(200).json({
    success: true,
    message: "Update address successfully",
  });
});

const getMe = asyncMiddleware(async (req, res, next) => {
  const { id: userId } = req.user;

  const user = await User.findByPk(userId, {
    attributes: {
      exclude: ["password", "email"],
    },

    include: {
      model: Address,
      attributes: {
        exclude: ["city"],
      },
    },
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

const changePassword = asyncMiddleware(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id: userId } = req.user;

  const user = await User.findByPk(userId);

  if (!user) {
    throw new ErrorResponse(404, "User not found");
  }

  const isMatch = bcrypt.compareSync(oldPassword, user.password);

  if (!isMatch) {
    throw new ErrorResponse(400, "Invalid password");
  }

  const hashedPassword = hashPassword(newPassword);

  await user.update({
    password: hashedPassword,
  });

  res.status(200).json({
    success: true,
    message: "Change password successfully",
  });
});

const forgotPassword = asyncMiddleware(async (req, res, next) => {
  const { email } = req.body;

  const existToken = await ForgotToken.findOne({
    email,
  });

  if (existToken) {
    throw new ErrorResponse(400, "Please check your email to reset password");
  }

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ErrorResponse(404, "User not found");
  }

  // generate forgot password token
  const token = randomBytes(32);

  // save token to database
  const forgotPasswordToken = new ForgotToken({
    email,
    token,
  });

  // send mail
  const link = `${process.env.CLIENT_URL}/forgot-password/${token}`;

  const sendMail = mail.sendMail({
    to: email,
    subject: "Reset password",
    html: `<h1>Click <a href="${link}">here</a> to reset password</h1>`,
  });

  await Promise.all([forgotPasswordToken.save(), sendMail]);

  res.status(200).json({
    success: true,
    message: "Please check your email to reset password",
  });
});

const verifyForgotToken = asyncMiddleware(async (req, res, next) => {
  const { token } = req.body;

  const tokenDoc = await ForgotToken.findOne({
    token,
  });

  if (!tokenDoc) {
    throw new ErrorResponse(400, "Invalid Token");
  }

  res.status(200).json({
    success: true,
    email: tokenDoc.email,
  });
});

const resetPassword = asyncMiddleware(async (req, res, next) => {
  const { email, token, newPassword } = req.body;

  const tokenDoc = await ForgotToken.findOne({
    email,
    token,
  });

  if (!tokenDoc) {
    throw new ErrorResponse(400, "Invalid Token");
  }

  const hashedPassword = hashPassword(newPassword);

  await Promise.all([
    ForgotToken.deleteOne({
      email,
      token,
    }),
    User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          email,
        },
      }
    ),
  ]);

  res.status(200).json({
    success: true,
    message: "Reset password successfully",
  });
});

module.exports = {
  updateAddress,
  getMe,
  changePassword,
  forgotPassword,
  verifyForgotToken,
  resetPassword,
};
