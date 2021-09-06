const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const reactViews = require('express-react-views');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewsRouter');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
//PUG
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

//REACT
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());
// 1. Global  Middlewares

app.use(express.static(path.join(__dirname, 'public')));

// Set security hhp headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': ["'self'", 'https:', "'unsafe-inline'", 'http:'],
        'script-src': ["'self'", "'unsafe-inline'", 'https:'],
        'style-src': ["'self'", "'unsafe-inline'", 'https:'],
        'img-src': ['*', 'data:'],
        'connect-src': ["'self'", 'http:', 'https:'],
        'frame-src': ["'self'"],
      },
      accessControlAllowOrigin: '*',
    }, // helmet() returns a function
  })
);

// app.use(helmet({ contentSecurityPolicy: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//body parser - reading data into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against noSQL query injections
app.use(mongoSanitize());

// Data sanitization against XSS (cross site scripting) atacks
app.use(xssClean());

app.use(cors());

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

// app.use(express.static(`${__dirname}/public/`));

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

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`The url ${req.originalUrl} not found on the server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;

//test
/*
middleware is a function that can modify the incoming request data -
its call midleware because it tray between the request and responce
routing - app. + request method(pathname, callback)
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side...', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can Post on this url...');
});
app.use adds a middleware function to middleware stack


morgan - 3d part middleware which allows 

*/

//2. Route handlers

//READING tours data

// ****** USERS   *********

// app.get('/api/v1/tours', getAllTours);

//Geting exact tour
// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

//3.ROUTES

/*
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser); */

// const userRouter = express.Router();
// const tourRouter = express.Router();
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/tours', tourRouter);

// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// userRouter.route('/').get(getAllUsers).post(createUser);
// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//4. start a server
