const { env } = require('../config/env');

const basicAuth = (req, res, next) => {
  if (env.ENV !== 'development') {
    next();
    return;
  }

  const headerToken = req.headers.authorization;

  console.log('headerToken => ', headerToken);
  if (!headerToken || !headerToken.startsWith('Basic ')) {
    return res.status(401).json({
      success: false,
      message: 'Basic Auth is invalid',
    });
  }

  const token = headerToken.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Basic Auth is invalid',
    });
  }

  // dXNlcjEyMzpwYXNzd29yZA==  => user:password
  const decoded = new Buffer.from(token, 'base64').toString();

  if (decoded !== `${env.BASIC_USER}:${env.BASIC_PASSWORD}`) {
    return res.status(401).json({
      success: false,
      message: 'Basic Auth is invalid',
    });
  }
  next();
};

module.exports = basicAuth;
