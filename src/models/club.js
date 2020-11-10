const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({

  clubName: { type: String },
  clubAddress: { type: String },
  clubMail:  { type: String },
  clubManagerId:  { type: String }
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;