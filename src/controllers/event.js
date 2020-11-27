const { eventProvider } = require('../providers');

module.exports = {
    getEventsList: async (req, res) => {
        try {
            const events = await eventProvider.getEventsList();
            res.send(events);
        }
        catch(ex) {
            console.log(`error getting Events List - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getEventById: async (req, res) => {
        try {
            const { eventId } = req.params; 
            const event = await eventProvider.getEventById(eventId);
            res.send(event);
        }
        catch(ex) {
            console.log(`error getting Event By Id - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getEventByIdPopulated: async (req, res) => {
        try {
            const { eventId } = req.params; 
            const event = await eventProvider.getEventByIdPopulated(eventId);
            res.send(event);
        }
        catch(ex) {
            console.log(`error getting Event By Id Populated - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getEventsListByQuery: async (req, res) => {
        try {
            const { query } = req.params; 
            const events = await eventProvider.getEventsListByQuery(query);
            res.send(events);
        }
        catch(ex) {
            console.log(`error getting Events List By Query - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getEventsListByQueryPopulated: async (req, res) => {
        try {
            const { query } = req.params; 
            const events = await eventProvider.getEventsListByQueryPopulated(query);
            res.send(events);
        }
        catch(ex) {
            console.log(`error getting Events List By Query - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    createEvent: async (req, res) => {
        try {
            const event = req.body;
            const createdEvent = await eventProvider.createEvent(event);
            res.send(createdEvent);
        }
        catch(ex) {
            console.log(`error creating Event - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    updateEvent: async (req, res) => {
        try {
            const { eventId } = req.params;
            const event = req.body;
            const updatedEvent = await eventProvider.updateEvent(eventId, event);
            res.send(updatedEvent);
        }
        catch(ex) {
            console.log(`error updating Event - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    updateEventImage: async (req, res) => {
        try {
            const { eventId } = req.params;
            const eventImageUrl = req.body.eventImageUrl
            const updatedEvent = await eventProvider.updateEventImage(eventId, eventImageUrl);
            res.send(updatedEvent);
        }
        catch(ex) {
            console.log(`error updating Event Image - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const { eventId } = req.params;
            await eventProvider.deleteEvent(eventId);
            res.send(true);
        }
        catch(ex) {
            console.log(`error deleting Event - ${ex}`);
            res.status(500).send('error in server');
        }
    },
}