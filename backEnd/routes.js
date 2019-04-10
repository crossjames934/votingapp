const nodemailer = require('nodemailer');
const crypto = require('crypto');

const models = require('./models');

module.exports = app => {
    //  Test
    app.get('/ping', (req, res) => {
        return res.send('pong!');
    });

    // Get IP address
    app.get('/ip', (req, res) => {
        let ipAddress = req.connection.remoteAddress;

        if (req.headers && req.headers['x-forwarded-for']) {
            [ipAddress] = req.headers['x-forwarded-for'].split(',');
        }

        return res.send(ipAddress);
    });

    // Registering User
    app.post('/register', async (req, res) => {
        try {
            // Check if user already exists, via email and username
            const matchingEmail = await models.User.findOne({email: req.body.email});
            if (matchingEmail) return res.send('An account associated with that email address already exists.');
            const matchingUsername = await models.User.findOne({username: req.body.username});
            if (matchingUsername) return res.send('An account with that username already exists');
            // Create new user
            const {username, password, email} = req.body;
            const newUser = new models.User({
                username,
                password,
                email
            });
            const user = await newUser.save();
            // Create new token
            const newToken = new models.Token({
                userId: user._id,
                token: crypto.randomBytes(16).toString('hex')
            });
            const token = newToken.save(); // doesn't need await
            res.send(user);
            // res.send('Registered successfully, please check email for activation code.');
        } catch (e) {
            res.send('There was an error: ' + e);
        }
    });

    // Log in
    app.post('/login', (req, res) => {

    });
};