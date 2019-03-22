const Product = require('../models/product');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function(req, res){
    let product = new Product(
        {
            sku: req.body.ske,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            id: req.body.id,
            quantity: req.body.quantity,
        }
    );

    product.save(function(err){
        if (err){
            return next(err);
        }
        res.send('Product created successfully')
    })
}