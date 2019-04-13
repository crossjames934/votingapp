const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    isVerified: Boolean
});

const pollSchema = new mongoose.Schema({
    author: String,
    question: String,
    choices: Array,
    votes: Object
});

const tokenSchema = new mongoose.Schema({
    userId: String,
    token: String
});

module.exports = {
    User: mongoose.model('User', userSchema, 'users'),
    Poll: mongoose.model('Poll', pollSchema, 'polls'),
    Token: mongoose.model('Token', tokenSchema, 'tokens')
};