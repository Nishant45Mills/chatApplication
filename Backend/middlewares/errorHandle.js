const errorHandler = (err, req, res, next) => {
  switch (err.statusCode) {
    case 400:
      res.status(err.statusCode).json({
        code: err.statusCode,
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case 409:
      res.status(err.statusCode).json({
        code: err.statusCode,
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;
