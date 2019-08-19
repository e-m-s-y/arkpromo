const id = require('../id');
const express = require('express');
const Router = require('./router');
const Storage = require('../local-storage');

const router = express.Router();

/**
 *
 */
router.get('/', (req, res, next) => {
	res.render('retailer/index', {
		title: 'What would you like to do?'
	});
});

/**
 *
 */
router.get('/offer/add', (req, res, next) => {
	res.render('retailer/offer/add', {
		title: 'Add new offer'
	});
});

/**
 *
 */
router.post('/offer/add', (req, res, next) => {
	let offers = Storage.getLocalStorage() || [];

	offers.push({
		id: id.generate(),
		name: req.body.name || undefined,
		token_price: req.body.token_price || undefined,
		reference: req.body.reference || undefined,
		description: req.body.description || undefined,
		expires: req.body.expires || undefined
	});

	Storage.writeToLocalStorage(offers);

	res.redirect('/');
});

/**
 *
 */
router.get('/offers', (req, res, next) => {
	res.render('retailer/offer/remove', {
		title: 'Remove an offer',
		offers: Storage.getLocalStorage() || []
	});
});

/**
 *
 */
router.get('/remove/offer', (req, res, next) => {
	let offers = Storage.getLocalStorage() || [];

	offers = offers.filter((offer, index) => {
		return offer.id !== req.query.id;
	});

	Storage.writeToLocalStorage(offers);

	res.redirect('/retailer/offers');
});

/**
 * @type {Router}
 */
module.exports = new Router('/retailer', router);