const Role = require('../models/mysql/Role');
const User = require('../models/mysql/User');

exports.authorize =
  (...roles) =>
  (req, res, next) => {
    const userId = req.user.id;
    User.findByPk(userId, {
      include: [Role],
    })
      .then((user) => {
        if (!user || !roles.includes(user.role)) {
          return res.status(403).json({
            success: false,
            message: 'No Permission',
          });
        }
        req.user.role = user.role;
        next();
      })
      .catch(() => {
        return res.status(403).json({
          success: false,
          message: 'No Permission',
        });
      });
  };
