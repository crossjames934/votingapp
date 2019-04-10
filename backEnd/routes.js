// const path = require('path');

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

    app.post('/register', (req, res) => {
        console.log(req.body);
        res.json(req.body);
    });
};