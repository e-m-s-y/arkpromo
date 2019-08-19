const fs = require('fs');

/**
 * Class LocalStorage
 */
class LocalStorage {
	/**
	 *
	 */
	constructor() {
		this.path = __dirname + '/storage.json';
	}

	/**
	 * @returns {null}
	 */
	getLocalStorage() {
		try {
			return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
		} catch(error) {
			console.error('File %s does not exist.', this.path);

			return null;
		}
	}

	/**
	 * @param data
	 */
	writeToLocalStorage(data) {
		data = JSON.stringify(data);

		fs.writeFileSync(this.path, data, 'utf-8');

		console.log('Wrote %s to storage', data);
	}
}

/**
 * @type {LocalStorage}
 */
module.exports = new LocalStorage();