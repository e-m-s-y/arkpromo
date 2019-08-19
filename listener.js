/**
 * Class Listener
 */
class Listener {
	/**
	 * @param event
	 * @param callable
	 */
	constructor(event, callable) {
		this.event = event;
		this.callable = callable;
	}
}

/**
 * @type {Listener}
 */
module.exports = Listener;