const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const User = require("../models/mysql/User");

const makeOwner = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.body;

  await User.update(
    {
      role: "owner",
    },
    {
      where: {
        id: userId,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  makeOwner,
};
