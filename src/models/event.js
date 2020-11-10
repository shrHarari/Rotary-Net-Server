const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    eventName: { type: String },
    eventPictureUrl: { type: String },
    eventDescription: { type: String },
    eventStartDateTime: { type: Date },
    eventEndDateTime: { type: Date },
    eventLocation: { type: String },
    eventManager: { type: String }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;