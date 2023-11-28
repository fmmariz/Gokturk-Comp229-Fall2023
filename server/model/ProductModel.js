const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'A car must have a name'],
			unique: true,
			trim: true,
			maxlength: [
				100,
				'A car name must have less or equal then 100 characters',
			],
			minlength: [3, 'A car name must have more or equal then 3 characters'],
		},
		slug: String,
		price: {
			type: Number,
			required: [true, 'A car must have a price'],
			min: [0, 'Price must be a positive number'],
		},
		description: {
			type: String,
			trim: true,
			required: [true, 'A car must have a description'],
		},
		image: {
			type: String,
			required: [true, 'A car must have an image'],
		},
		make: {
			type: String,
			required: [true, 'A car must have a make'],
		},
		model: {
			type: String,
			required: [true, 'A car must have a model'],
		},
		year: {
			type: Number,
			required: [true, 'A car must have a manufacture year'],
		},
		mileage: {
			type: Number,
			required: [true, 'Mileage information is required'],
		},
		fuelType: {
			type: String,
			required: [true, 'Fuel type is required'],
		},
		engineSize: {
			type: String,
			required: [true, 'Engine size information is required'],
		},
		transmission: {
			type: String,
			required: [true, 'Transmission information is required'],
		},
		bodyType: {
			type: String,
			required: [true, 'Body type is required'],
		},
		color: {
			type: String,
			required: [true, 'Color information is required'],
		},
		ratingsAverage: {
			type: Number,
			default: 0,
			min: [0, 'Rating must be above 0'],
			max: [5, 'Rating must be below 5'],
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Indexing
productSchema.index({ price: 1, ratingsAverage: -1 });
productSchema.index({ slug: 1 });

// Middleware to automatically create a slug from the name
productSchema.pre('save', function (next) {
	this.slug = slugify(this.name + ' ' + this.model, { lower: true });
	next();
});

// Document middleware to log the document after save
productSchema.post('save', function (doc, next) {
	console.log(doc);
	next();
});

// Create the model
const productModel = mongoose.model('Cars', productSchema);

module.exports = productModel;
