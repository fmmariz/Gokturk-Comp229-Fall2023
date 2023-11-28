const Product = require('../model/ProductModel');

const factory = require('./handlerFactory');

exports.UpdateProduct = factory.UpdateOne(Product);
exports.DeleteProduct = factory.deleteOne(Product);
exports.getProduct = factory.getOne(Product);
exports.GetAllProducts = factory.GetAll(Product);
exports.CreateProduct = factory.createOne(Product);

exports.aliasTopTours = (req, res, next) => {
	req.query.limit = '5';
	req.query.sort = '-ratingAverage,price';
	req.query.fields = 'name,price,ratingsAverage,make,model,color,year';
	next();
};
