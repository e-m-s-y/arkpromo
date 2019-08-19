/**
 * Class Router
 */
class Router {
	/**
	 * @param path
	 * @param callable
	 */
	constructor(path, callable) {
		this.path = path;
		this.callable = callable;
	}
}

/**
 * @type {Router}
 */
module.exports = Router;