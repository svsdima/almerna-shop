import mongoose from 'mongoose';

const reviewsSchema = mongoose.Schema(
	{
		name: {type: String, required: true},
		rating: {type: Number, required: true},
		comment: {type: String, required: true},
	},
	{
		timestamps: true,
	}
);

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		mainImage: {
			type: String,
			required: true,
		},
		item: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			required: true,
		},
		bandSizes: {
			type: Array,
			required: true,
		},
		materials: {
			type: String,
			required: true,
		},
		images: {
			type: Array,
			required: true,
		},
		colors: {
			type: Array,
			required: true,
		},
		reviews: [reviewsSchema],
		height: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		oldPrice: {
			type: Number,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		new: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchema);

export default Product;
