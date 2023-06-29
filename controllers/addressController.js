const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const Address = require("../models/mysql/Address");
const { ErrorResponse } = require("../response/ErrorResponse");

const update = asyncMiddleware(async (req, res, next) => {
  const { city, address, province, zip } = req.body;
  const { id: userId } = req.user;

  const user = await Address.findOne({
    where: {
      UserId: userId,
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
        UserId: userId,
      },
    }
  );

  res.status(200).json({
    success: true,
    message: "Update address successfully",
  });
});

module.exports = {
  update,
};
