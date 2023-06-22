const errorMiddleware = (err, req, res, next) => {
  const { code = 500, message } = err;
  console.log("==> Error middleware ");
  res.status(code).json({
    success: false,
    message: message || "Internal Error.",
  });
};

module.exports = {
  errorMiddleware,
};
