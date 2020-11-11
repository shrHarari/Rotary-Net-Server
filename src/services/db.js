require('dotenv').config();

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/rotary', {
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotary', {

var URL = process.env.MONGODB_ROTARY_URI || 'mongodb://localhost/rotary';

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(`great success. Db is ready!`);
});

module.exports = db;