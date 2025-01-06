const ErrorHandler = (err, req, res, next) => {

  console.log(err);

  const statusCode = err.statusCode;
  const message = err.message;
  res.status(statusCode || 500).json({
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = ErrorHandler;