// http://openexchangerates.github.io/money.js
var fx = require('money');

fx.base = 'EUR';

fx.rates = {
	'EUR': 1,
	'GBP': 0.73
}

module.exports = fx;