
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	sku: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: function(v) {
				return /[0-9A-Z]{8}/.test(v);
			},
			message: props => `${props.value} is not a valid SKU value.`
		},	
	},
	name: {
		type: String,
		required: true
	},
	catagory: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				return /(\d+\.\d{1,2})/.test(v);
			},
			message: props => `${props.value} is not a valid price`
		},
	},
	quantity: {
		type: Number,
		required: true,
		min: 0
	}
});

const Product = mongoose.model('products', itemSchema);
module.exports = Product;