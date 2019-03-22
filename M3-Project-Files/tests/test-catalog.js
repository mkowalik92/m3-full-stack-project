const chai = require('chai');
const chaiHttp = require('chai-http');
const mongodb = require('../src/mongodb');
const should = chai.should();

chai.use(chaiHttp);

describe('RESTful Verbs', function(){

	it('Should add product to MongoDB database using POST request', function(done) {
		chai.request(mongodb)
	});
	
	it('Should add valid product to MongoDB database using POST request', function(done) {
		chai.request(mongodb)
	});
	
	it('Should increment existing product to MongoDB database using PUT request', function(done) {
		chai.request(mongodb)
	});
	
	it('Should decrement existing product to MongoDB database using PUT request', function(done) {
		chai.request(mongodb)
	});
	
	it('Should modify quantity of existing product in MongoDB database using PUT request', function(done) {
		chai.request(mongodb)
	});
	
	it('Should return existing product from MongoDB database on GET/<id> request', function(done) {
		chai.request(mongodb)
	});
	
	it('Should return all existing products from MongoDB database using GET request', function(done) {
		chai.request(mongodb)
		.get('/item')
			.end(function(err, res){
				res.should.have.status(200);
			});
	});
	
	it('Should return bad status code if product does not exist in the MongoDB database using GET/<id> request', function(done) {
		chai.request(mongodb)
	});	
	
	it('Should remove product from MongoDB database using DELETE request', function(done) {
		chai.request(mongodb)
	});
});
