const { rateLimit } = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");
const { env } = require("../config/env");

const limiter = ({ windowMs = 1 * 60 * 1000, max = 60 }) => {
  return rateLimit({
    store: new MongoStore({
      uri: `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DATABASE}`,
      user: env.MONGO_USERNAME,
      password: env.MONGO_PASSWORD,
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
