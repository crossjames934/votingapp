const crypto = require('crypto');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const passport = require('passport');
const path = require('path');

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

    // Test to see if User is already logged in
    app.get('/whoami', (req, res) => {
        if (!req.user) return res.send(null);
        return res.send(req.user.username);
    });

    // Logout
    app.get('/logout', (req, res) => {
        req.logout();
        res.send('logged out');
    });

    // Confirmation of email address through token
    app.get('/confirmation/:token', async (req, res) => {
        try {
            const content = `<br><p>Click <a href='https://${req.headers.host}'>here</a> to go to homepage.</p>`;
            const errorMessage = "<p>Sorry, the token doesn't match any of our users</p>" + content;
            const tokenObject = await models.Token.findOne({token: req.params.token});
            if (!tokenObject) return res.send(errorMessage);
            const user = await models.User.findOne({_id: tokenObject.userId});
            if (!user) return res.send(errorMessage);
            user.isVerified = true;
            await user.save();
            res.send('<p>User successfully verified!</p>' + content);
        } catch (e) {
            res.send(e);
        }
    });

    // Bad credentials, wrong password etc
    app.get('/badcredentials', (req, res) => {
        res.json({loggedin: false, message: 'Wrong username or password'});
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
            const saltRounds = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser = new models.User({
                username,
                password: hash,
                email,
                isVerified: false
            });
            const user = await newUser.save();
            // Create new token
            const newToken = new models.Token({
                userId: user._id,
                token: crypto.randomBytes(16).toString('hex')
            });
            const token = await newToken.save(); // doesn't need await
            // Send verification email
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const mail = {
                from: 'no-reply@crossvoting.herokuapp.com',
                to: user.email,
                subject: 'Account Verification',
                text: 'Hello James \n\n ' +
                    'To activate your account please verify your email address by clicking the link below \n\n' +
                    'https://' +
                    req.headers.host +
                    '/confirmation/' +
                    token.token
            };
            sgMail.send(mail);
            res.send('Registered successfully, please check email for activation code.');
        } catch (e) {
            res.send(e);
        }
    });

    // Log in
    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/badcredentials' }),
        (req, res) => {
            res.json({loggedIn: true, message: req.user.username});
        });
};