const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/AppError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
// 1. Global  Middlewares

//Set security hhp headers
app.use(helmet()); // helmet() returns a function

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//body parser - reading data into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against noSQL query injections
app.use(mongoSanitize());

// Data sanitization against XSS (cross site scripting) atacks
app.use(xssClean());

//prevent parameter polution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use(express.static(`${__dirname}/public/`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
});

app.use('/api', limiter);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`The url ${req.originalUrl} not found on the server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
