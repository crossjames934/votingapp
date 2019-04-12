const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');

const models = require('./models');

module.exports = app => {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            models.User.findOne({username: username}, async (err, user) => {
                if (err) return console.error(err);
                // user will return null if username does not exist in DB
                if (!user) {
                    return done(null, "", {message: 'Incorrect Username'});
                }
                const correctPassword = await bcrypt.compare(password, user.password);
                if (!correctPassword) {
                    return done(null, "", {message: 'Incorrect Password.'});
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};