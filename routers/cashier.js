const express = require('express');
const Router = require('./router');

const router = express.Router();

/**
 *
 */
router.get('/', (req, res, next) => {
	res.render('cashier/index', {
		title: 'Send tokens to customer'
	});
});

/**
 *
 */
router.post('/scan', (req, res, next) => {
	res.render('cashier/scan', {
		title: 'Scanning for wallet...',
		amount: parseFloat(req.body.spendingAmountInFiat * process.env.TOKENS_PER_SINGLE_FIAT).toFixed(8).toString().split('.').join('')
	});
});

/**
 * @type {Router}
 */
module.exports = new Router('/cashier', router);