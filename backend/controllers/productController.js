import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc   Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc   Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		images: ['/img/sample.png'],
		item: '/img/sample.png',
		mainImage: '/img/sample.png',
		category: 'Sample category',
		height: 0,
		size: 'A',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
		materials: 'Sample material',
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc   update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		images,
		item,
		mainImage,
		category,
		height,
		size,
		materials,
		numReviews,
		countInStock,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.images = images;
		product.item = item;
		product.mainImage = mainImage;
		product.category = category;
		product.height = height;
		product.size = size;
		product.materials = materials;
		product.numReviews = numReviews;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };
