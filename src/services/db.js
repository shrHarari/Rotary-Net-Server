

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotary', {
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