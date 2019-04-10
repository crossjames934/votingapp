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
    votes: Array
});

module.exports = {
    User: mongoose.model('User', userSchema),
    Poll: mongoose.model('Poll', pollSchema)
};