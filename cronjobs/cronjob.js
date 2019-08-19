const cron = require('node-cron');

/**
 * Class Cronjob
 */
class Cronjob {
	/**
	 * @param name
	 * @param schedule
	 * @param callable
	 * @param options
	 */
	constructor(name, schedule, callable, options) {
		this.name = name;
		this.schedule = schedule;
		this.callable = callable;
		this.options = options;

		const self = this;

		cron.schedule(schedule, () => {
			callable();

			console.log('Executed cronjob: %s', self.name);
		}, options);
	}
}

/**
 * @type {Cronjob}
 */
module.exports = Cronjob;