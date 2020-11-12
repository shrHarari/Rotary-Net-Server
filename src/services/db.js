require('dotenv').config();

// CONNECTION STRING:
// Cluster Name: RotaryNet
// User: adminMongoDbUser
// Password: adminPass
const MONGODB_ROTARY_URI = 'mongodb+srv://adminMongoDbUser:adminPass@rotarynet.zg8h8.mongodb.net/rotary?retryWrites=true&w=majority'
const MONGODB_SAMPLE_URI = 'mongodb+srv://adminMongoDbUser:adminPass@rotarynet.zg8h8.mongodb.net/sample_mflix?retryWrites=true&w=majority'
// const MONGODB_ROTARY_URI = 'mongodb+srv://adminMongoDbUser:adminPass@rotarynet.zg8h8.mongodb.net/rotary?authSource=admin&replicaSet=atlas-1zs1z6-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
// const MONGODB_ROTARY_URI = 'mongodb://heroku_h7zlcmm7:2ajsra7im7oklcfbn4024hkh7i@ds149875.mlab.com:49875/heroku_h7zlcmm7'

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/rotary', {
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotary', {

  // var URL = process.env.MONGODB_SAMPLE_URI || 'mongodb://localhost/rotary';

  var URL_TEST = MONGODB_SAMPLE_URI || 'mongodb://localhost/rotary';

mongoose.connect(URL_TEST, {
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