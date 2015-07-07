/**
 * Created by Madalina.Lacatus on 7/6/2015.
 */
// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var Product    = require('./scripts/models/Product');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lista'); // connect to our database


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

router.route('/lista')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        console.log('asdasda');
        var product= new Product();      // create a new instance of the product model
        product.denumire = req.body.denumire;  // set the product name (comes from the request)
        product.amanunte = req.body.amanunte;
        product.cumparat=req.body.cumparat;
        product.editare=req.body.editare;

        // save the bear and check for errors

        product.save(function (err) {

            if (err)
                res.send(err);

            res.json({message: 'Product created!'});
        });
    })
    // get all the products (accessed at GET http://localhost:8080/api/bears)
    .get(function (req, res) {
        Product.find(function (err, lista) {
            if (err)
                res.send(err);

            res.json(lista);
        });

    });
router.route('/lista/:product_id')



    .delete(function(req, res) {
        Product.remove({_id: req.params.product_id}, function(err, product) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    })

.put(function(req, res) {

    // use our bear model to find the bear we want
    Product.findById(req.params.product_id, function (err, product) {

        if (err)
            res.send(err);

        product.denumire = req.body.denumire;  // update
        product.amanunte = req.body.amanunte;


        // save the bear
        product.save(function (err) {

            if (err)
                res.send(err);

            res.json({message: 'Product created!'});
        });
    })
})