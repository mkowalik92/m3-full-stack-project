const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
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
	category: {
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
	id: {
		type: Number,
		required: true,
		min: 0
	},
	quantity: {
		type: Number,
		required: true,
		min: 0
	}
});

const Product = mongoose.model('Item', itemSchema);
module.exports = Product;