const express = require('express');
const Router = require('./router');

const router = express.Router();

/**
 *
 */
router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'Select your entry point'
	});
});

/**
 * @type {Router}
 */
module.exports = new Router('/', router);