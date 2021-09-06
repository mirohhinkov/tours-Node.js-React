const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const { default: validator } = require('validator');
// const validator = require('validator');

//Createng MONGOOSE Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'The tour name must have less or equal to 40 charachters',
      ],
      minlength: [
        10,
        'The tour name must have more or equal to 10 charachters',
      ],
      // validate: [validator.isAlpha, 'Tour name must only contains characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'Atour must have difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty types are: easy, medium and difficult',
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'The min rating is 1'],
      max: [5, 'The max rating is 5'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    //CUSTOM VALIDATOR
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          //this points to the current document only of case of creating a new document, and not on update
          return val < this.price;
        },
        message: (props) =>
          `Discount of ${props.value} must be lower then the price`,
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      requires: [true, 'A tour must have an image'],
    },
    images: [String],
    secretTour: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      adress: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        adress: String,
        description: String,
        day: Number,
      },
    ],
    guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ price: 1, ratingAverage: -1 });
tourSchema.index({ slug: 1 });

tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

//MONGOOSE MIDDLEWARE - functions which are called before or after the event
//TYPES -DOCUMENT, QUERY,AGGREGATE AND MODEL
//document middleware - act on the currently processed document

// pre - runs before executing of save() and create(), this points to the currently processed document
//pre - before saving
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// post - after saving - have access to the saved document

//QUERY Middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  console.log('populating guides');
  next();
});

tourSchema.pre('findOne', function (next) {
  this.populate('reviews');
  console.log('populating reviews');
  next();
});

tourSchema.post('save', (doc, next) => {
  console.log(doc);
  next();
});

// tourSchema.post(/^find/, (docs, next) => {
//   next();
// });

//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  if (!this.pipeline()[0].$geoNear) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  }
  next();
});
//Creating a model

const Tour = mongoose.model('Tour', tourSchema);

//Creating documents

// const testTour = new Tour({
//   name: 'The Forest Hiker',
//   rating: 4.7,
//   price: 497,
// });

module.exports = Tour;
