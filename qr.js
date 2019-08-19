/**
 * Class Qr
 */
class Qr
{
	/**
	 * @param object
	 */
	objectToUri(object) {
		const params = [];
		let uri = object.address ? 'ark:' + object.address : '';

		if(typeof object.amount !== 'undefined') {
			params.push('amount=' + object.amount);
		}

		if(typeof object.label !== 'undefined') {
			params.push('label=' + object.label);
		}

		if(typeof object.vendorField !== 'undefined') {
			params.push('vendorField=' + object.vendorField);
		}

		uri = (params.length > 0) ? uri + '?' + params.join('&') : uri;

		return JSON.parse(JSON.stringify(uri));
	}

	/**
	 * @param uri
	 */
	uriToObject(uri) {
		let pairs = uri.split('?');
		const object = {
			address: pairs[0].split(':')[1]
		};
		pairs = pairs[1].split('&');

		for(let i in pairs) {
			if(pairs.hasOwnProperty(i)) {
				const split = pairs[i].split('=');

				object[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
			}
		}

		return object;
	}
}

/**
 * @type {Qr}
 */
module.exports = new Qr();