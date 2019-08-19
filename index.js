require('dotenv').config();

const ExpressApp = require('./app');
const HttpServer = require('./http-server');

const app = new ExpressApp([
	require('./middlewares/set-request-id')
], [
	require('./routers/index'),
	require('./routers/customer'),
	require('./routers/cashier'),
	require('./routers/retailer')
]);

const server = new HttpServer(app.source, process.env.SERVER_PORT || 3000, {});

require('./set-socket-listeners')(server);

server.boot();

require('./cronjobs/remove-expired-offers');