/**
 * Class Middleware
 */
class Middleware {
	/**
	 * @param callable
	 * @param name
	 */
	constructor(callable, name) {
		this.callable = callable;
		this.name = name;
	}
}

/**
 * @type {Middleware}
 */
module.exports = Middleware;