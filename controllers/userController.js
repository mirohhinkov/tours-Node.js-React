const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // const { user } = req;
  const allowedFields = ['email', 'name'];

  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('To change password use /updateMyPass route'));

  const filteredObj = {};
  Object.keys(req.body).forEach((el) => {
    if (allowedFields.includes(el)) filteredObj[el] = req.body[el];
  });
  const user = await User.findByIdAndUpdate(req.user._id, filteredObj);
  res.status(200).json({
    status: 'succsess',
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  // console.log(user);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet implement' });
};

exports.getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet implement' });
};

exports.updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet implement' });
};

exports.deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet implement' });
};
