const Listener = require('./listener');
const BridgechainApi = require('./bridgechain-api');

/**
 * @param server
 * @returns {Listener}
 */
function createBlockForgedListener(server) {
	return new Listener('block.forged', async(data) => {
		console.log('Block forged: %s', JSON.stringify(data));
		console.timeEnd('start');
		console.time('start');

		server.broadcastSocketEvent('block.forged', data);
	});
}

/**
 * @param server
 * @returns {Listener}
 */
function createTransactionForgedListener(server) {
	return new Listener('transaction.forged', async(data) => {
		console.log('Transaction forged: %s', JSON.stringify(data));

		if(typeof data.vendorField !== 'undefined') {
			try {
				const vendorField = JSON.parse(data.vendorField);

				server.emitSocketEventToChannel(vendorField.id, {
					callable: 'onTransactionForged'
				});
			} catch(error) {
				console.error('VendorField is not a valid JSON object: %s', data.vendorField);
			}
		}
	});
}

/**
 * @param server
 * @returns {Listener}
 */
function createNewTransactionListener(server) {
	return new Listener('transaction.new', async(data) => {
		console.log('Sending new transaction with data: %s', JSON.stringify(data));

		data.vendorField = JSON.stringify({
			id: data.sessionId
		});

		server.emitSocketEventToChannel(data.sessionId, {
			callable: 'onTransactionSent'
		});

		BridgechainApi.sendTransaction(data)
			.then((response) => {
				console.log(response);

				if(response.status === 200) {
					console.log(JSON.stringify(response.data));

					if(response.data.data.accept.length !== 1) {
						server.emitSocketEventToChannel(data.sessionId, {
							callable: 'onTransactionFailed'
						});
					}

					// Do nothing wait for block to be forged.
				} else {
					server.emitSocketEventToChannel(data.sessionId, {
						callable: 'onTransactionFailed'
					});
				}
			})
			.catch((error) => {
				console.error(error);

				server.emitSocketEventToChannel(data.sessionId, {
					callable: 'onTransactionFailed'
				});
			});
	});
}

/**
 * @param server
 */
module.exports = (server) => {
	server.setSocketEventListeners([
		createBlockForgedListener(server),
		createTransactionForgedListener(server),
		createNewTransactionListener(server)
	]);
};