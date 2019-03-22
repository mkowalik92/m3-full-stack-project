const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const product = require('../routes/product');

mongoose.connect("mongodb+srv://admin:M3Node123@databasecluster-tgxhv.mongodb.net/test?retryWrites=true", { useNewUrlParser: true})
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

db.on('error', 	console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

var port = 1234;

app.listen(port, () => {
	console.log('Server is running on port ' + port);
});
