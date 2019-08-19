var Socket = {
	socket: undefined,
	emit: function(event, data) {
		data = data || {};
		data.sessionId = this.getSessionId();

		this.socket.emit(event, data);

		console.log("Emitted event '%s' with data %s", event, JSON.stringify(data));
	},
	watch: function(channel, callable) {
		this.socket.watch(channel, function(data) {
			console.log("Received data %s on channel '%s'", JSON.stringify(data), channel);

			callable(data);
		});

		console.log("Added listener to channel '%s'", channel);
	},
	subscribe: function(channel) {
		this.socket.subscribe(channel);

		console.log("Subscribed to channel '%s'", channel);
	},
	on: function(event, callable) {
		this.socket.on(event, function(data) {
			console.log("Received data %s on event '%s'", JSON.stringify(data), event);

			callable(data);
		});

		console.log("Added listener to event '%s'", event);
	},
	getSessionId: function() {
		return $('body').attr('data-session-id');
	},
	connect: function() {
		if(typeof this.socket !== 'undefined') {
			console.warn('Socket is already connected, returning...');

			return;
		}

		this.socket = socketCluster.create({
			port: $('body').attr('data-socket-server-port'),
			autoReconnectOptions: {
				randomness: 1000,
				maxDelay: 1000
			},
			query: {
				sessionId: this.getSessionId()
			}
		});

		this.watch(this.getSessionId(), function(data) {
			// Execute callable dynamically, the server will send a callable according to the fired event.
			if(typeof window[data.callable] === 'function') {
				window[data.callable](data);
			}
		});

		var self = this;

		this.on('connect', function() {
			console.log('Socket is connected.');

			self.subscribe(self.getSessionId());
		});
	}
};