const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getTopFive = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage, price';
  req.query.fields = 'name,ratingAverage,price,duration,difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Tour.find(), req.query)
    .filtering()
    .sorting()
    .projecting()
    .paginating(await Tour.countDocuments());

  const tours = await apiFeatures.query;

  //SEND RESPONCE
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) return next(new AppError("Could'n find a tour with that ID"));
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  // const newTour = new Tour(req.body);
  // const tour = await newTour.save();
  res.status(201).json({
    status: 'success',
    data: newTour,
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) return next(new AppError("Could'n find a tour with that ID"));
  res.status(200).json({ status: 'success', data: { tour } });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) return next(new AppError("Could'n find a tour with that ID"));
  res.status(204).json({ status: 'success', data: null });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  //in aggregate have to pass anarray of stages
  const stat = await Tour.aggregate([
    {
      $match: { ratingAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        // when want everything in one group - _id: null
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        totalRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // { $match: { _id: { $ne: 'EASY' } } },
  ]);
  res.status(200).json({ status: 'success', data: stat });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = +req.params.year;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $addFields: {
        tourYear: { $year: '$startDates' },
        month: { $month: '$startDates' },
      },
    },
    {
      $match: {
        tourYear: year,
      },
    },
    {
      $group: {
        _id: '$month',
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $sort: { numTours: -1 },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $limit: 12,
    },
  ]);
  res.status(200).json({ status: 'success', data: plan });
});
