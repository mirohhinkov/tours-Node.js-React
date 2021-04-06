const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must have an user name'],
    trim: true,
  },
  email: {
    type: String,
    require: [true, 'You must have an e-mail'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'You must enter a valid email'],
  },
  photo: {
    type: String,
    default: 'default picture url',
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    select: false,
    required: true,
    trim: true,
    validate: [
      validator.isStrongPassword,
      'At least 8 charachers, 1 lowercase, 1 uppercase, 1 number, 1 symbols',
    ],
  },
  passwordConfirm: {
    type: String,
    required: true,
    trim: true,
    validate: {
      //this validation works only on CREATE and SAVE
      validator: function (val) {
        return val === this.password;
      },
      message: 'two passwords must be equal',
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre('save', async function (next) {
  // run this if the password is changed
  if (!this.isModified('password')) return next();
  // hash(encrypt) the password
  this.password = await bcrypt.hash(this.password, 12);
  //   delete passwordConfirm fron DB
  this.passwordConfirm = undefined; // this field will not persist in the DB
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimeStamp > JWTTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
