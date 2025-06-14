const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
const asyncHandler = require('express-async-handler');

// exports.protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   // Make sure token exists
//   if (!token) {
//     return next(new ErrorResponse('Not authorized to access this route', 401));
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id);

//     next();
//   } catch (err) {
//     return next(new ErrorResponse('Not authorized to access this route', 401));
//   }
// });


exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Fallback to cookie
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // If no token found
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return next(new ErrorResponse('No user found with this token', 404));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};