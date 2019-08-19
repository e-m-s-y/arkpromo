const ip = require('ip');
const url = require('url');
const http = require('http');
const Listener = require('./listener');
const socketCluster = require('socketcluster-server');

/**
 * Class Server
 */
class Server {
	/**
	 * @param app
	 * @param port
	 * @param socketOptions
	 */
	constructor(app, port = 3000, socketOptions = null) {
		const scope = this;

		scope.port = normalizePort(port);

		app.set('port', scope.port);

		scope.httpServer = http.createServer(app);
		scope.eventEmitter = socketCluster.attach(scope.httpServer, socketOptions);
		scope.socketEventListeners = [];

		addEventListener(scope.httpServer, new Listener('error', onError));
		addEventListener(scope.httpServer, new Listener('listening', onListening));
		addEventListener(scope.eventEmitter, new Listener('connection', function(socket) {
			onSocketConnection(socket, scope);
		}));
	}

	/**
	 *
	 * @param listeners
	 */
	setSocketEventListeners(listeners) {
		this.socketEventListeners = listeners;
	}

	/**
	 * @param event
	 * @param data
	 */
	broadcastSocketEvent(event, data) {
		const clients = this.eventEmitter.clients;

		for(let key in clients) {
			if(clients.hasOwnProperty(key)) {
				clients[key].emit(event, data);
			}
		}
	}

	/**
	 * @param channel
	 * @param data
	 */
	emitSocketEventToChannel(channel, data) {
		this.eventEmitter.exchange.publish(channel, data);

		console.log('Emitted %s to channel %s', JSON.stringify(data), channel);
	}

	/**
	 *
	 */
	boot() {
		this.httpServer.listen(this.port);
	}
}

/**
 * @param instance
 * @param listener
 */
function addEventListener(instance, listener) {
	if(listener instanceof Listener) {
		instance.on(listener.event, listener.callable);

		console.log('Added listener to event "' + listener.event + '" on ' + instance.constructor.name);
	}
}

/**
 * @param val
 * @returns {*}
 */
function normalizePort(val) {
	const port = parseInt(val, 10);

	if(isNaN(port)) {
		return val;
	}

	if(port >= 0) {
		return port;
	}

	return false;
}

/**
 * @param error
 */
function onError(error) {
	if(error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch(error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 *
 */
function onListening() {
	console.log('Server is listening on %s at port %s', ip.address(), this.address().port)
}

/**
 * @param socket
 * @param server
 */
function onSocketConnection(socket, server) {
	const query = url.parse(socket.request.url, true).query;
	socket.sessionId = query.id || null;

	console.log('New socket connection from ip %s with query %s', socket.remoteAddress, JSON.stringify(query));

	for(let listener of server.socketEventListeners) {
		addEventListener(socket, listener);
	}
}

/**
 * @type {Server}
 */
module.exports = Server;