const dotenv = require('dotenv');
dotenv.config({ path: './../server/config.env' });
const app = require('./app');
const mongoose = require('mongoose');
const productModel = require('./model/ProductModel');
const data = require('./data/info.json');

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
).replace('<DATABASE_NAME>', process.env.DBNAME);

mongoose.set('strictQuery', false);




(async () => {
	try {
		const con = await mongoose.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Database Connected');
		// You can proceed with other operations that depend on the database connection here.
	} catch (error) {
		console.error('Database Connection Error:', error);
		// Handle the error as needed.
	}
})();
//function to import first put one product test the endpoints
const importData = async () => {
	try {
		await productModel.create(data); // assuming 'data' is an array of car objects
		console.log('Data successfully imported');
	} catch (err) {
		console.error('Error importing data: ', err);
	} finally {
		//mongoose.disconnect();
	}
};

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`app running on port ${port}...`);
});
