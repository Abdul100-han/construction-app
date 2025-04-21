const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private (Vendor only)
exports.createProduct = asyncHandler(async (req, res, next) => {
  // Add vendor to req.body
  req.body.vendor = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().populate('vendor', 'name email');

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (Vendor only)
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure vendor is product owner
  if (product.vendor.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this product`, 401)
    );
  }

  await product.deleteOne();


  res.status(200).json({
    success: true,
    data: {}
  });
});