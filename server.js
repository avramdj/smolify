const http = require('http');
const config = require('./config')
const app = require('./app');

const server = http.createServer(app);
const port = process.env.PORT || config.PORT || 4040
server.listen(port);

server.once('listening', function () {
    console.info(`Listening on http://localhost:${port}`);
});