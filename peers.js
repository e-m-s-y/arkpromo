/**
 * Class Peers
 */
class Peers {
	/**
	 *
	 */
	constructor() {
		// .env does not support Arrays.
		this.peers = process.env.PEERS.split(',');
	}

	/**
	 * @returns {*}
	 */
	getRandomPeer() {
		if(this.peers.length === 0) {
			throw new Error('There are no peers found in the .env file.');
		}

		const peer = this.peers[Math.floor(Math.random() * this.peers.length)];

		console.log('Returned random peer %s', peer);

		return peer;
	}
}

/**
 * @type {Peers}
 */
module.exports = new Peers;