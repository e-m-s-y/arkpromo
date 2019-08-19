const Cronjob = require('./cronjob');
const Storage = require('../local-storage');

/**
 * Runs every minute.
 *
 * @type {Cronjob}
 */
module.exports = new Cronjob('Remove expired offers', '*/1 * * * *', () => {
	let offers = Storage.getLocalStorage() || [];

	offers = offers.filter((offer) => {
		return new Date(offer.expires).getTime() >= (new Date()).getTime();
	});

	Storage.writeToLocalStorage(offers);
}, {});