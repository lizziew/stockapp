var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');
require('colors');  
var _ = require('lodash');
var util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stock Analysis App' });
});

//SINGLE COMPANY : LAST TRADED WITH PRICE ONLY
router.get('/getSingleData', function(req, res) {
	var FIELDS = _.flatten([
	  ['l1']
	]);

	var SYMBOL = 'AAPL';

	yahooFinance.snapshot({
		fields: FIELDS,
		symbol: SYMBOL
	}, function (err, snapshot) {
	if (err) { throw err; }
	console.log(util.format('=== %s ===', SYMBOL).cyan);
	console.log(JSON.stringify(snapshot));
	res.send(JSON.stringify(snapshot));
	});
});

module.exports = router;
