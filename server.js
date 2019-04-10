// Dependencies
const express = require('express');
const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// My Modules
const routes = require('./backEnd/routes');
const models = require('./backEnd/models');

// Connect to Database
mongoose.connect(process.env.DB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => { console.log('successfully connected to database') });

// Setting up App
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
routes(app);

// Index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// setTimeout(() => {
//     const testPoll = new models.Poll({
//         author: "James Cross",
//         question: "Who is the best?",
//         choices: ['Me', 'You'],
//         votes: []
//     });
//     testPoll.save((err, data) => {
//         if (err) return console.error(err);
//         console.log(data);
//     })
// }, 5000);

// Listen for requests
app.listen(port);