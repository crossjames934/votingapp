const crypto = require('crypto');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const passport = require('passport');
// const path = require('path');

const models = require('./models');

module.exports = app => {
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
            const content = `<br><p>Click <a href='https://crossvoting.herokuapp.com'>here</a> to go to homepage.</p>`;
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
                    'https://crossvoting.herokuapp.com/confirmation/' +
                    token.token
            };
            sgMail.send(mail);
            res.send('Registered successfully, please check email for activation link.');
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

    // List of Polls for Poll Menu
    app.get('/pollList', async (req, res) => {
        try {
            const allPolls = await models.Poll.find();
            allPolls.sort((a,b) => b.dateAdded - a.dateAdded);
            let list = allPolls.map(poll => {
                let userHasVoted = false;
                for (let i = 0; req.user && i < poll.choices.length; i++) {
                    const choice = poll.choices[i];
                    if (poll.votes[choice].includes(req.user.username)) {
                        userHasVoted = true;
                        break;
                    }
                }
                return {
                    question: poll.question,
                    id: poll._id,
                    dateAdded: poll.dateAdded,
                    lastVotedOn: poll.lastVotedOn,
                    voteCount: poll.voteCount,
                    userHasVoted
                }
            });
            res.send(list);
        } catch (e) {
            res.send(e);
        }
    });

    // Get data for poll to display in showPoll widget
    app.get('/pollData/:id', async (req, res) => {
        try {
            const poll = await models.Poll.findById(req.params.id);
            res.send(poll);
        } catch (e) {
            res.send(e);
        }
    });

    // Post a new poll
    app.post('/poll', async (req, res) => {
        try {
            const {question, choices, author} = req.body;
            const newPoll = new models.Poll({
                question,
                choices,
                author,
                votes: {},
                dateAdded: new Date(),
                lastVotedOn: new Date(),
                voteCount: 0
            });
            // For each choice, make an empty array to store ip address of voter
            choices.forEach(choice => {
                newPoll.votes[choice] = [];
            });
            await newPoll.save();
            res.send('poll msg posted');
        } catch (e) {
            res.send(e);
        }
    });

    // Get list of own polls
    app.post('/myPolls', async (req, res) => {
        const responseObject = {
            error: null,
            message: "",
            polls: []
        };
        try {
            const pollList = await models.Poll.find({author: req.body.username});
            if (pollList.length === 0) {
                responseObject.message = 'No polls found made by ' + req.body.username;
                responseObject.error = true;
            } else {
                responseObject.polls = pollList;
            }
        } catch (e) {
            responseObject.error = e;
            responseObject.message = "There was an error on the server side, see console for error";
        }
        res.send(responseObject)
    });

    app.post('/castVote', async (req, res) => {
        try {
            const {choice, id, username} = req.body;
            const poll = await models.Poll.findById(id);
            poll.choices.forEach(option => {
                const indexOfUsername = poll.votes[option].indexOf(username);
                if (indexOfUsername > -1) {
                    poll.votes[option].splice(indexOfUsername, 1);
                    poll.voteCount--;
                }
            });
            poll.votes[choice] = [username, ...poll.votes[choice]];
            poll.lastVotedOn = new Date();
            poll.voteCount++;
            const {votes, voteCount, lastVotedOn} = poll;
            const updateFields = {votes, voteCount, lastVotedOn};
            const savedPoll = await models.Poll.findOneAndUpdate({_id: id}, updateFields, {new: true});
            const results = poll.choices.map(option => ({choice: option, count: savedPoll.votes[option].length}));
            res.send(results);
        } catch (e) {
            res.send(e);
        }
    });
};