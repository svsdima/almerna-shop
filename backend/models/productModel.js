import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
	{
		name: {tipe: String, required: true},
		rating: {tipe: Number, required: true},
		comment: {tipe: String, required: true},
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
		image: {
			type: String,
			required: true,
		},
		brand: {
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
		material: {
			type: String,
			required: true,
		},
		colors: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			required: true,
		},
		colors: {
			type: String,
			required: true,
		},
		reviews: [reviewSchema],
		height: {
			type: Number,
			required: true,
			default: 0,
		},
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchema);

export default Product;
