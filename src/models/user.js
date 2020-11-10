const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    personCardId: { type: mongoose.Schema.Types.ObjectId, ref: "PersonCard" },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    userType: { type: String },
    stayConnected: { type: Boolean }
});

const User = mongoose.model('User', userSchema);

module.exports = User;