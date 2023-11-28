const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/productController');
const authController = require('../controller/authController');

const {
	GetAllProducts,
	getProduct,
	DeleteProduct,
	UpdateProduct,
	CreateProduct,
	aliasTopTours,
} = productController;
const { protect, restrictTo } = authController;

// Public routes (no authentication required)
productRouter.get('/', GetAllProducts); // Get all products
productRouter.get('/:id', getProduct); // Get a single product by
productRouter.route('/top-5-cheap').get(aliasTopTours, GetAllProducts);

// Protected routes (authentication required)
productRouter.use(protect);

// Assuming 'admin' role is required to modify the product data
productRouter.post('/', restrictTo('admin'), CreateProduct); // Create a new product
productRouter.patch('/:id', restrictTo('admin'), UpdateProduct); // Update a product by ID
productRouter.delete('/:id', restrictTo('admin'), DeleteProduct); // Delete a product by ID

module.exports = productRouter;
