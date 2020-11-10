const mongoose = require('mongoose');

const personCardSchema = new mongoose.Schema({
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    firstNameEng: { type: String },
    lastNameEng: { type: String },
    phoneNumber: { type: String },
    phoneNumberDialCode: { type: String },
    phoneNumberParse: { type: String },
    phoneNumberCleanLongFormat: { type: String },
    pictureUrl: { type: String },
    cardDescription: { type: String },
    internetSiteUrl: { type: String },
    address: { type: String },
    areaId: { type: mongoose.Schema.Types.ObjectId, ref: "Area"},
    clusterId: { type: mongoose.Schema.Types.ObjectId, ref: "Cluster" },
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    messages: 
    [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
      { messageReadStatus: { type: Boolean } } 
    ]
  });
  
  const PersonCard = mongoose.model('PersonCard', personCardSchema);

  module.exports = PersonCard;
