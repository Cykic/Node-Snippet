const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const details = require('../config');
// const appError = require("../utils/appError");
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = await signToken(newUser);

    console.log(token);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });

    console.log('User created');
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err,
      name: err.name,
    });
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // If email and paswword exist
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  // Check if user exist & password is correct
  const foundUser = await User.findOne({ email }).select('+password'); // + because password default is not selected

  // if no user or paswword is not correct
  if (!foundUser || !(await confirmPassword(password, foundUser.password))) {
    return res.status(401).json({ error: 'Incorrect email or password' });
  }

  // if everything is ok send token
  const token = await signToken(foundUser);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.editProfile = (req, res) => {
  // If header contains token
  if (!req.header('authorization'))
    return res.status(401).json({ message: 'Not authorized missing token' });

  // 1. token
  const bearerToken = req.headers('authorization');
  const token = bearerToken.split(' ')[1];
  // 2. Update User document
  res.status(200).json({
    status: 'success',
    token,
  });
};

exports.updatePassword = async (req, res) => {
  try {
    jwt.verify(token, details.JWT_SECRET, function (err, decodedToken) {
      if (err) {
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid token',
        });
      } else {
        req.userId = decodedToken.id;
        console.log(req.userId); // Add to req object
        next();
      }
    });
  } catch (err) {
    console.log(err.message);
  }
  // 1. Get user from collection
  const filteredBody = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };
  const user = await User.findByIdAndUpdate(req.userId, filteredBody, {
    new: true,
    runValidators: true,
  });

  // 2. Confirm Password
  res.status(200).json({
    status: 'success',
    user,
  });
};

// HELPER FUNCTIONS

const confirmPassword = async function (inputPassword, encryPassword) {
  return await bcrypt.compare(inputPassword, encryPassword);
};
const signToken = async (newUser) =>
  jwt.sign({ id: newUser._id }, details.JWT_SECRET, {
    expiresIn: details.JWT_EXPIRATION,
  });

const filterObj = (obj, ...fields) => {};
