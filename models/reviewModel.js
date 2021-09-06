const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewShema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1.0,
      max: 5.0,
      default: 4.5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must have an author'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewShema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  this.populate({
    path: 'tour',
    select: 'name',
  });
  next();
});

reviewShema.index({ tour: 1, user: 1 }, { unique: true }); // Prevents multiple reviews from one user

reviewShema.statics.calcAverageRating = async function (tourId) {
  const stat = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stat.length !== 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stat[0].avgRating,
      ratingAverage: stat[0].nRatings,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingAverage: 4.5,
    });
  }
};

reviewShema.post('save', function () {
  this.constructor.calcAverageRating(this.tour._id);
});

reviewShema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});

reviewShema.post(/^findOneAnd/, function () {
  this.r.constructor.calcAverageRating(this.r.tour._id);
});

const Review = mongoose.model('Review', reviewShema);

module.exports = Review;
