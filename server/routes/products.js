const express = require('express');
const {
  getProducts,
  createProduct,
  deleteProduct
} = require('../controllers/products');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(protect, authorize('vendor'), createProduct);

router
  .route('/:id')
  .delete(protect, authorize('vendor'), deleteProduct);

module.exports = router;