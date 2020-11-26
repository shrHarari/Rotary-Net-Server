
const { Event } = require('../models');
const mongoose = require('mongoose')

const _getEventsList = async () => {
    try {
        const events = await Event.find().lean().exec();
        return events;
    }
    catch(ex) {
        console.log(`cannot get Events List from db. ${ex}`);
        return Promise.reject();
    }
};

const _getEventById = async (eventId) => {
    try {
        const event = await Event.findOne({
            _id: mongoose.Types.ObjectId(eventId)
        }).lean().exec();
        return event;
    }
    catch(ex) {
        console.log(`cannot get Event By Id from db. ${ex}`);
        return Promise.reject();
    }
};

const _getEventByIdPopulated = async (eventId) => {
    try {
        const event = await Event.findOne({
            _id: mongoose.Types.ObjectId(eventId)
        })
        .populate({
            path: 'eventComposerId',
            model:'PersonCard',
        });
        return event;
    }
    catch(ex) {
        console.log(`cannot get Event By Id Populated from db. ${ex}`);
        return Promise.reject();
    }
};

const _getEventsListByQuery = async (query) => {
    try {
        searchStr = {eventName: {$regex: query, $options: 'ig'}}; 

        const events = await Event.find(searchStr).lean().exec();
        return events;
    }
    catch(ex) {
        console.log(`cannot get Events By Query from db. ${ex}`);
        return Promise.reject();
    }
};

const _createEvent = async (event) => {
    try {
        const newEvent = new Event(event);
        await newEvent.save();
        return newEvent
    }
    catch(ex) {
        console.log(`cannot create Event in db. ${ex}`);
        return Promise.reject();
    }
};

const _updateEvent = async (eventId, event) => {
    try {
        await Event.findByIdAndUpdate({
            _id: eventId
        }, event);
        return;
    }
    catch(ex) {
        console.log(`cannot update Event in db. ${ex}`);
        return Promise.reject();
    }
};

const _updateEventImage = async (eventId, eventImageUrl) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            {_id: eventId}, 
            {eventPictureUrl: eventImageUrl},
            { new: true, useFindAndModify: false }
        );
        
        return(updatedEvent);
    }
    catch(ex) {
        console.log(`cannot update Event Image in db. ${ex}`);
        return Promise.reject();
    }
};

const _deleteEvent = async (eventId) => {
    try {
        await Event.deleteOne({
            _id: eventId
        });
        return;
    }
    catch(ex) {
        console.log(`cannot delete Event from db. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {
    getEventsList: () => {
        return _getEventsList();
    },

    getEventById: (eventId) => {
        return _getEventById(eventId);
    },

    getEventByIdPopulated: (eventId) => {
        return _getEventByIdPopulated(eventId);
    },
    
    getEventsListByQuery: (query) => {
        return _getEventsListByQuery(query);
    },

    createEvent: (event) => {
        return _createEvent(event);
    },

    updateEvent: (eventId, event) => {
        return _updateEvent(eventId, event);
    },

    updateEventImage: (eventId, eventImageUrl) => {
        return _updateEventImage(eventId, eventImageUrl);
    },

    deleteEvent: (eventId) => {
        return _deleteEvent(eventId);
    }
}