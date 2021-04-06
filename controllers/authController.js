const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') options.secure = true;
  if (user.password) user.password = '********************';
  res.cookie('jwt', token, options);
  res.status(statusCode).json({
    status: 'succsess',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createAndSendToken(newUser, 201, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. check if the email and password exists
  if (!password || !email) {
    return next(new AppError('You have to provide email and password', 400));
  }
  // 2. if user exisy && password is correct
  const user = await User.findOne({ email }).select('+password');
  // console.log(user);
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect credentials', 401));
  //3. send token to the client
  createAndSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // check token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return next(new AppError('Please log in!', 401));
  // validate token
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  //check if user still exist
  const user = await User.findById(decodedToken.id);
  if (!user) return next(new AppError('User does not exist', 401));

  //check if user changed password after JWT has been issued

  if (user.changedPasswordAfter(decodedToken.iat))
    return next(
      new AppError('You have to log in again - changed credentials', 401)
    );
  req.user = user;
  next();
});

exports.restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new AppError('You do not have permitions for this action!', 403)
    );
  }
  next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('User does not exist', 404));

  //generate random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send it back to the email
  const resetURL = `${req.protocol}://${req.host}/api/vi/users/resetPass/${resetToken}`;

  const message = `To change your password send patch request to: ${resetURL} with your new password and passwordConfirm`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your change email token. expires in 10 mins',
      message,
    });
    res
      .status(200)
      .json({ status: 'success', message: 'Token sent to the email' });
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('Error sending email. Try again later', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on a token
  const encriptedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: encriptedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  //2. if token had not expired and there's a user set new password
  if (!user) return next(new AppError('Invalid or expired token', 400));
  //3. update changed Password properti for the user
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //4. log the user in and send JWT token to client
  createAndSendToken(user, 200, res);
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const password = req.body.currentPassword;
  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect current password', 401));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createAndSendToken(user, 200, res);
});
