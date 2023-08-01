const { rateLimit } = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");

const limiter = ({ windowMs = 1 * 60 * 1000, max = 60 }) => {
  return rateLimit({
    store: new MongoStore({
      uri: process.env.MONGO_URI,
      user: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      expireTimeMs: windowMs,
      errorHandler: console.error.bind(null, "rate-limit-mongo"),
    }),
    windowMs,
    max,
    message: "Too many requests from this IP.",
    handler: (req, res, next, options) => {
      res.status(options.statusCode).json({
        success: false,
        message: options.message,
      });
    },
  });
};

module.exports = {
  limiter,
};
