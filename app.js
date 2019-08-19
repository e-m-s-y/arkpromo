const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const Router = require('./routers/router');
const createError = require('http-errors');
const Middleware = require('./middlewares/middleware');

/**
 * Class ExpressApp
 */
class ExpressApp {
	constructor(middlewares = [], routers = []) {
		this.source = express();

		addMiddlewares(this.source, middlewares);
		setupViewEngine(this.source);
		enableLogging(this.source);
		enableBodyParser(this.source);
		setupPublicDirectory(this.source);
		addRouters(this.source, routers);
		setupErrorHandlers(this.source);
	}
}

/**
 * @param app
 */
function setupViewEngine(app) {
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug');
}

/**
 * @param app
 */
function enableLogging(app) {
	app.use(logger('dev'));
}

/**
 * @param app
 */
function enableBodyParser(app) {
	app.use(bodyParser.urlencoded({extended: true}));
}

/**
 * @param app
 */
function setupPublicDirectory(app) {
	app.use(express.static(path.join(__dirname, 'public')));
}

/**
 * @param app
 * @param middlewares
 */
function addMiddlewares(app, middlewares) {
	for(let middleware of middlewares) {
		if(middleware instanceof Middleware) {
			app.use(middleware.callable);

			console.log('Added middleware: ' + middleware.name);
		}
	}
}


/**
 * @param app
 * @param routers
 */
function addRouters(app, routers) {
	for(let router of routers) {
		if(router instanceof Router) {
			app.use(router.path, router.callable);

			console.log('Added router: ' + router.path);
		}
	}
}

/**
 * @param app
 */
function setupErrorHandlers(app) {
	// 404 handler.
	app.use(function(req, res, next) {
		// Forward error to handler below.
		next(createError(404));
	});

	// Error handler.
	app.use(function(err, req, res, next) {
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		res.status(err.status || 500);
		res.render('error');
	});
}

/**
 * @type {ExpressApp}
 */
module.exports = ExpressApp;