const AppError = require('../utils/AppError');

const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateValues = (err) =>
  new AppError(`${Object.keys(err.keyValue)[0]} has to be unique`, 400);

const handleValidationErrors = (err) => {
  const messages = Object.keys(err.errors).map(
    (el) => err.errors[el].properties.message
  );
  return new AppError(messages.join('; '), 400);
};

const handleJWTErrors = () =>
  new AppError('Invalid token! Please log in!', 401);

const handleTokenExpiredErrors = () =>
  new AppError('Invalid token! Please log in!', 401);

const devError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const prodError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    devError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error;
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateValues(err);
    if (err.name === 'ValidationError') error = handleValidationErrors(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTErrors(err);
    if (err.name === 'TokenExpiredError') error = handleTokenExpiredErrors(err);

    prodError(error, res);
  }
};
