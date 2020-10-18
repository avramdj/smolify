const http = require('http');
const config = require('./config')
const app = require('./app');
const fs = require('fs');

/*
const http = require('express')();

http.get('*', function(req, res) {
    res.redirect('https://smolify.me' + req.url);
})

const options = {
    key: fs.readFileSync('./ssl/key.key'),
    ca: fs.readFileSync('./ssl/ca.ca-bundle'),
    cert: fs.readFileSync('./ssl/cert.crt'),
};
*/

const server = http.createServer(app);
const port = process.env.PORT || config.PORT || 4040
server.listen(port);

server.once('listening', function () {
    console.info(`Listening on http://localhost:${port}`);
});
