const ErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode;
  const message = err.message;
  res.status(statusCode).json({
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = ErrorHandler;