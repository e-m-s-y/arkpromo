const Id = require('../id');
const Middleware = require('./middleware');

/**
 * @type {Middleware}
 */
module.exports = new Middleware((req, res, next) => {
	res.locals.sessionId = Id.generate();

	next();
}, 'set session identifier');