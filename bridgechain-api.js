const axios = require('axios');
const Crypto = require("@arkecosystem/crypto");

const Transactions = Crypto.Transactions;
const TransactionBuilder = Transactions.BuilderFactory.transfer().instance();

/**
 * Class BridgechainApi
 */
class BridgechainApi {
	/**
	 *
	 */
	constructor() {
		this.peers = require('./peers');
		this.headers = {'Content-Type': 'application/json', 'API-Version': 2};
	}

	/**
	 * @returns {Promise.<*>}
	 */
	async findTransactionByVendorField(vendorField) {
		const peer = this.peers.getRandomPeer();

		return axios.post(peer + '/api/v2/transactions/search', {
			vendorFieldHex: new Buffer(vendorField, 'utf8').toString('hex')
		}, {
			headers: this.headers
		});
	}

	/**
	 * @param transactions
	 * @returns {Promise.<*>}
	 */
	async sendTransactions(transactions) {
		const peer = this.peers.getRandomPeer();

		console.log('Sending %s transactions to %s with data: %s',
			transactions.length,
			peer,
			JSON.stringify({
				transactions
			})
		);

		return axios.post(peer + '/api/v2/transactions', {
			transactions
		}, {
			headers: this.headers
		});
	}

	/**
	 * @param data
	 * @returns {Promise}
	 */
	async sendTransaction(data) {
		return this.sendTransactions([
			createTransaction(data)
		]);
	}
}

/**
 * @param data
 */
function validateTransactionData(data) {
	if(typeof data.amount === 'undefined' || !data.amount) {
		throw new Error('Transaction: The amount of tokens is lacking');
	}

	if(typeof data.recipientId === 'undefined' || !data.recipientId) {
		throw new Error('Transaction: The ID of the recipient is lacking');
	}
}

/**
 * @param data
 */
function createTransaction(data) {
	validateTransactionData(data);

	const transaction = TransactionBuilder.amount(data.amount)
		.recipientId(data.recipientId);

	// Override the timestamp because it gets bugged sometimes.
	transaction.timestamp = new Date().getTime();

	if(data.vendorField) {
		transaction.vendorField(data.vendorField);
	}

	transaction.sign(process.env.APPLICATION_WALLET_BIP39);

	return transaction.getStruct();
}

/**
 * @type {BridgechainApi}
 */
module.exports = new BridgechainApi();