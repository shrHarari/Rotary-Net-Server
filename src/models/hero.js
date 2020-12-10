const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({

  id: { type: Number },
  name: { type: String },
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;