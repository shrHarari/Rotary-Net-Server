require('dotenv').config();

// CONNECTION STRING:
// Cluster Name: RotaryNet
// User: adminMongoDbUser
// Password: adminPass
// mongodb+srv://adminMongoDbUser:adminPass@rotarynet.zg8h8.mongodb.net/rotary?retryWrites=true&w=majority

// MONGODB_ROTARY_URI: mongodb://heroku_h7zlcmm7:2ajsra7im7oklcfbn4024hkh7i@ds149875.mlab.com:49875/heroku_h7zlcmm7

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