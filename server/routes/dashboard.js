const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Buyer dashboard route
router.get('/buyer', protect, authorize('buyer'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome Buyer! Access the marketplace.'
  });
});

// Vendor dashboard route
router.get('/vendor', protect, authorize('vendor'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome Vendor! Manage your listings.'
  });
});

// Rider dashboard route
router.get('/rider', protect, authorize('rider'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome Rider! View delivery schedule.'
  });
});

module.exports = router;