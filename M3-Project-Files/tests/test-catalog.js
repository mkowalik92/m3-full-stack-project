const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const should = chai.should();

const mongodb = require('../src/mongodb');
const Product = require('../models/product');

chai.use(chaiHttp)


describe('RESTful Verbs', function(){
	
	Product.collection.drop();
	
	beforeEach(function(done){
		let newProduct = new Product({
			_id: new mongoose.Types.ObjectId(),
			sku: 'KS944RUR',
			name: 'Xbox 360',
			catagory: 'Technology',
			price: 89.99,
			quantity: 5
		});
		
		newProduct.save(function(err) {
			done();
		});
	});
	
	afterEach(function(done){
		Product.collection.drop();
		done();
	});
	
	it('Should list all existing products from MongoDB database on /products GET request', function(done) {
		chai.request(mongodb)
		.get('/products')
		.end(function(err, res){
			
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
				
			res.body[0].should.have.property('name');
			res.body[0].should.have.property('catagory');
			res.body[0].should.have.property('_id');
			res.body[0].name.should.equal('Xbox 360');
			done();
			
		});
	});
	
	it('Should return existing product from MongoDB database on product/<id> GET request', function(done) {
		let newProduct = new Product({
			_id: new mongoose.Types.ObjectId(),
			sku: 'PS444RUR',
			name: 'Playstation 4',
			catagory: 'Technology',
			price: 89.99,
			quantity: 7
		});
		
		newProduct.save(function(err, data){
			chai.request(mongodb)
			.get('/product/' + data.id)
			.end(function(err, res){
				
				res.should.have.status(200);
				res.should.be.json;
				
				res.body.should.have.property('sku');
				res.body.should.have.property('name');
				res.body.should.have.property('_id');
				
				res.body.name.should.equal('Playstation 4');
				res.body.catagory.should.equal('Technology');
				res.body._id.should.eql(data.id);
				
				done();
			});
		});
	}); 
	
	it('Should add product to MongoDB database on /products POST request', function(done) {
		let newProduct = new Product({
			_id: new mongoose.Types.ObjectId(),
			sku: 'WII23789',
			name: 'Wii',
			catagory: 'Technology',
			price: 89.99,
			quantity: 7
		});
		
		chai.request(mongodb)
		.post('/products')
		.send(newProduct)
		.end(function(err, res){
			
			res.should.have.status(200);
			
			res.body.should.have.property('SUCCESS');
			
			res.body.SUCCESS.should.have.property('name');
			res.body.SUCCESS.should.have.property('catagory');
			res.body.SUCCESS.should.have.property('_id');
			res.body.SUCCESS.name.should.equal('Wii');
			res.body.SUCCESS.catagory.should.equal('Technology');
			
			done();
		}); 
	}); 
	
	it('Should update product from MongoDB database on /product/<id> PUT request', function(done) {
		let newProduct = new Product({
			_id: new mongoose.Types.ObjectId(),
			sku: 'NEWPRODU',
			name: 'Wii U',
			catagory: 'Technology',
			price: 109.99,
			quantity: 3
		});
		
		newProduct.save(function(err, newProduct){
			chai.request(mongodb)
				.put('/product/' + newProduct._id)
				.send({
					sku: 'NEWPRODU',
					name: 'Wii U',
					catagory: 'Technology',
					price: 99.99,
					quantity: 3 
				})
				.end(function(err, res){
					res.should.have.status(200);
					res.should.be.json;
						
					res.body.should.have.property('UPDATED');
					res.body.UPDATED.should.have.property('name');
					res.body.UPDATED.should.have.property('catagory');
					res.body.UPDATED.should.have.property('quantity');
					res.body.UPDATED.should.have.property('_id');
					
					res.body.UPDATED.name.should.equal('Wii U');
					res.body.UPDATED.price.should.equal('99.99');
						
					done();
				});
		});
/* 		chai.request(mongodb)
			.get('/products')
			.end(function(err, res){
				chai.request(mongodb)
					.put('/product/' + res.body[0]._id)
					.send(updatedProduct)
					.end(function(error, response){

						response.should.have.status(200);
						response.should.be.json;
						
						response.body.should.have.property('UPDATED');
						response.body.UPDATED.should.have.property('name');
						response.body.UPDATED.should.have.property('catagory');
						response.body.UPDATED.should.have.property('quantity');
						response.body.UPDATED.should.have.property('_id');
						
						response.body.UPDATED.name.should.equal('Xbox 360');
						response.body.UPDATED.price.should.equal('109.99');
						
						done();
					});
			}); */
	});
	
	it('Should remove product from MongoDB database on /product/<id> DELETE request', function(done) {
		chai.request(mongodb)
			.get('/products')
			.end(function(err, res){
				chai.request(mongodb)
					.delete('/product/' + res.body[0]._id)
					.end(function(error, response){
						response.should.have.status(200);
						response.should.be.json;
						
						response.body.should.have.property('REMOVED');

						response.body.REMOVED.should.have.property('name');
						response.body.REMOVED.should.have.property('_id');
						
						response.body.REMOVED.name.should.equal('Xbox 360');
						
						done();
					});
			});
	});
	
	
	
});
