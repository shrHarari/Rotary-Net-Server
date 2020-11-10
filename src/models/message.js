const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

  composerId: { type: mongoose.Schema.Types.ObjectId, ref: "PersonCard" },
  messageText: { type: String },
  messageCreatedDateTime: { type: Date },
  personCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "PersonCard" }],
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;