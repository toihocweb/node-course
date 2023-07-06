const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const Address = require("../models/mysql/Address");
const User = require("../models/mysql/User");
const { ErrorResponse } = require("../response/ErrorResponse");

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

module.exports = {
  updateAddress,
  getMe,
};
