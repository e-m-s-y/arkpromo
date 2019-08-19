const Qr = require('../qr');
const express = require('express');
const Router = require('./router');
const Storage = require('../local-storage');

const router = express.Router();

/**
 *
 */
router.get('/', (req, res, next) => {
	res.render('customer/index', {
		title: 'Current offers',
		offers: Storage.getLocalStorage() || []
	});
});

/**
 *
 */
router.get('/offer', (req, res, next) => {
	let offers = Storage.getLocalStorage() || [];


	for(let offer of offers) {
		if(offer.id === req.query.id) {
			console.log(JSON.stringify({
				id: res.locals.sessionId,
				reference: offer.reference
			}));

			return res.render('customer/offer', {
				title: 'Waiting for tokens...',
				uri: Qr.objectToUri({
					address: process.env.APPLICATION_WALLET_ADDRESS,
					amount: offer.token_price,
					label: 'ArkPromo',
					vendorField: JSON.stringify({
						id: res.locals.sessionId,
						reference: offer.reference
					})
				})
			});
		}
	}

	res.render('customer/offer', {
		title: 'Offer not found'
	});
});

/**
 * @type {Router}
 */
module.exports = new Router('/customer', router);