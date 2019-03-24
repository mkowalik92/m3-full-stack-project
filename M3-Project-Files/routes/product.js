const mongoose = require('mongoose');
const express = require('express');
const router =	express.Router();
const Product = require('../models/product');

router.get('/products', findAllProducts);
router.get('/product/:id', findProductById);
router.post('/products', addProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

function findAllProducts(req, res){
	Product.find(function(err, products){
		if(err)
		{
			res.json({'ERROR': err});
		}
		else
		{
			res.json(products);
		}
	});
}

function findProductById(req, res){
	Product.findById(req.params.id, function(err, product) {
		if (err)
		{
			res.json({'ERROR': err});
		}
		else
		{
			res.json(product);
		}
	});
}

function addProduct(req, res){
	let newProduct = new Product({
		_id: new mongoose.Types.ObjectId(),
		sku: req.body.sku,
		name: req.body.name,
		catagory: req.body.catagory,
		price: req.body.price,
		quantity: req.body.quantity
	});
	newProduct.save(function(err) {
		if(err) 
		{
			res.json({'ERROR': err});
		}
		else
		{
			res.json({'SUCCESS': newProduct});
		}
	});
}

function updateProduct(req, res) {
	Product.findById(req.params.id, function(err, product) {
		product.sku = req.body.sku;
		product.name = req.body.name;
		product.catagory = req.body.catagory;
		product.price = req.body.price;
		product.quantity = req.body.quantity;
		product.save(function(err) {
			if(err) 
			{
				res.json({'ERROR': err});
			}
			else
			{
				res.json({'UPDATED': product});
			}
		});
	});
}

function deleteProduct(req, res) {
	Product.findById(req.params.id, function(err, product){
		if(err){
			res.json({'ERROR': err});
		}
		else
		{
		product.remove(function(err){
			if(err)
			{
				res.json({'ERROR': err});
			}
			else
			{
				res.json({'REMOVED': product});
			}
		});
		}
	});
}
	
module.exports = router;