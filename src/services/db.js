require('dotenv').config();

////////////////////////////////
// CONNECTION STRING:
//------------------------------
// Cluster Name: RotaryNet
// User: adminMongoDbUser
// Password: adminPass
////////////////////////////////

// const MONGODB_ROTARY_URI = 'mongodb+srv://adminMongoDbUser:adminPass@rotarynet.zg8h8.mongodb.net/rotary?retryWrites=true&w=majority'

const mongoose = require('mongoose');

// mongoose.connect(MONGODB_ROTARY_URI || 'mongodb://localhost/rotary', {
mongoose.connect(process.env.MONGODB_ROTARY_URI || 'mongodb://localhost/rotary', {
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