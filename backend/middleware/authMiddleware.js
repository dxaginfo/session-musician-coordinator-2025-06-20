const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

/**
 * Middleware to protect routes that require authentication
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

/**
 * Middleware to verify if user is a musician
 */
const musician = (req, res, next) => {
  if (req.user && req.user.userType === 'musician') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as musician');
  }
};

/**
 * Middleware to verify if user is a client
 */
const client = (req, res, next) => {
  if (req.user && req.user.userType === 'client') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as client');
  }
};

/**
 * Middleware to verify if user is an admin
 */
const admin = (req, res, next) => {
  if (req.user && req.user.userType === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
};

module.exports = { protect, musician, client, admin };
