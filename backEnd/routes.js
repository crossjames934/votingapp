const path = require('path');
const bodyParser = require('body-parser');

module.exports = app => {
    app.get('/ping', (req, res) => {
        return res.send('pong!');
    });

    app.get('/ip', (req, res) => {
        let ipAddress = req.connection.remoteAddress;

        if (req.headers && req.headers['x-forwarded-for']) {
            [ipAddress] = req.headers['x-forwarded-for'].split(',');
        }

        return res.send(ipAddress);
    });

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    app.post('/register', (req, res) => {
        console.log(req.body);
        res.send(req.body);
    });
};