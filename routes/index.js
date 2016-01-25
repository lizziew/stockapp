var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');
require('colors');  
var _ = require('lodash');
var util = require('util');
var bodyParser = require('body-parser'); 

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.body); 
 	res.render('index', { 
 		title: 'Stock Analysis App',
 		data: 100 
	});
});

/* POST last traded with price only. */
router.post('/getData', function(req, res, next) {
	var FIELDS = _.flatten([
	  ['l1']
	]);
	var SYMBOLS = JSON.parse(req.body.names);

	console.log(SYMBOLS); 

	yahooFinance.snapshot({
	  fields: FIELDS,
	  symbols: SYMBOLS
	}, function (err, result) {
	  if (err) { throw err; }
	  var data = []; 
	  _.each(result, function (snapshot, symbol) {
	    console.log(util.format('=== %s ===', symbol).cyan);
	    console.log(JSON.stringify(snapshot));
	    data[symbol] = snapshot; 
	  });
	  res.send(data); 
	});
});

/* POST if stock symbol is valid. */
router.post('/checkStockSymbol', function(req, res, next) {
	var FIELDS = _.flatten([
	  ['l1']
	]);
	var SYMBOL = req.body.name;

	yahooFinance.snapshot({
	  fields: FIELDS,
	  symbol: SYMBOL
	}, function (err, snapshot) {
	  if (err) { throw err; }
	  if(snapshot["lastTradePriceOnly"] === null) {
	  	res.send("invalid");
	  }
	  else {
	  	res.send("valid");
	  }
	});
});

module.exports = router;
