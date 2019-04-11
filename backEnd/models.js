const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    isVerified: Boolean
});

// userSchema.methods.validPassword = async (pwd, user) => {
//     const result = await bcrypt.compare(pwd, user.password);
//     console.log(result);
//     return result;
// };

const pollSchema = new mongoose.Schema({
    author: String,
    question: String,
    choices: Array,
    votes: Array
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