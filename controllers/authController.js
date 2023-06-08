const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // check email
  const isExistedEmail = await User.findOne({ email });
  if (isExistedEmail) {
    return res.status(409).json({
      success: false,
      message: "Email is already existed",
    });
  }

  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({
    success: true,
  });
};

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) { 
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    const isMatch = bcrypt.compareSync(password, user.password)

    if (!isMatch) { 
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    // tao jsonwebtoken
    const token = jwt.sign({
      username: user.username,
      id: user._id,
      email: user.email,
    }, env.SECRET_KEY, { 
      expiresIn: env.EXPIRED_IN
    })

    res.json({
      success: true,
      token
    })

};

module.exports = {
  register,
  login,
};
