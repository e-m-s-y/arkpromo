exports.plugin = {
	pkg: require('../package.json'),
	defaults: require('./defaults'),
	alias: 'emsy:event-forwarder',
	socket: undefined,
	async register(container, options) {
		const logger = container.resolvePlugin('logger');

		if(options.events.length === 0) {
			logger.info('[' + this.alias +  '] No events given, plugin will be disabled.');

			return;
		}

		try {
			const eventEmitter = container.resolvePlugin('event-emitter');

			this.socket = require('socketcluster-client').create({
				port: options.port,
				hostname: options.ip
			});

			for(let event of options.events) {
				eventEmitter.on(event, async (data) => {
					this.socket.emit(event, data);

					logger.info('[' + this.alias +  '] Forwarded event "' + event + '".');
				});
			}
		} catch(error) {
			logger.error(error);

			// Ignore, don't let the relay crash.
		}
	}
};