const User = require("../models/mysql/User");

exports.authorize =
  (...roles) =>
  (req, res, next) => {
    const userId = req.user.id;
    User.findByPk(userId)
      .then((user) => {
        if (!user || !roles.includes(user.role)) {
          return res.status(403).json({
            success: false,
            message: "No Permission",
          });
        }
        next();
      })
      .catch(() => {
        return res.status(403).json({
          success: false,
          message: "No Permission",
        });
      });
  };
