const { messageProvider } = require('../providers');

module.exports = {
    getMessagesList: async (req, res) => {
        try {
            const messages = await messageProvider.getMessagesList();
            res.send(messages);
        }
        catch(ex) {
            console.log(`error getting Messages List - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getMessageById: async (req, res) => {
        try {
            const { messageId } = req.params; 
            const message = await messageProvider.geMessageById(messageId);
            res.send(message);
        }
        catch(ex) {
            console.log(`error getting Message By Id - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getMessageByIdPopulated: async (req, res) => {
        try {
            const { messageId } = req.params; 
            const message = await messageProvider.getMessageByIdPopulated(messageId);
            res.send(message);
        }
        catch(ex) {
            console.log(`error getting Message By Id Poupulated - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getMessagesListByComposerId: async (req, res) => {
        try {
            const { composerId } = req.params; 
            const messages = await messageProvider.getMessagesListByComposerId(composerId);
            res.send(messages);
        }
        catch(ex) {
            console.log(`error getting Messages List By ComposerId - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    createMessage: async (req, res) => {
        try {
            const message = req.body;
            const createdMessage = await messageProvider.createMessage(message);
            res.send(createdMessage);
        }
        catch(ex) {
            console.log(`error creating Message - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    updateMessage: async (req, res) => {
        try {
            const { messageId } = req.params;
            const message = req.body;
            const updatedMessage = await messageProvider.updateMessage(messageId, message);
            res.send(updatedMessage);
        }
        catch(ex) {
            console.log(`error updating Message - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    deleteMessage: async (req, res) => {
        try {
            const { messageId } = req.params;
            await messageProvider.deleteMessage(messageId);
            res.send(true);
        }
        catch(ex) {
            console.log(`error deleting Message - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    removeMessageFromPersonCardMessageQueue: async (req, res) => {
        try {
            const { messageId } = req.params;
            const { personCardId } = req.params;
            await messageProvider.removeMessageFromPersonCardMessageQueue(messageId, personCardId);
            res.send(true);
        }
        catch(ex) {
            console.log(`error deleting Message From PersonCard MessageQueue - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    addMessageBackToPersonCardMessageQueue: async (req, res) => {
        try {
            const { messageId } = req.params;
            const { personCardId } = req.params;
            await messageProvider.addMessageBackToPersonCardMessageQueue(messageId, personCardId);
            res.send(true);
        }
        catch(ex) {
            console.log(`error adding Message Back To PersonCard MessageQueue - ${ex}`);
            res.status(500).send('error in server');
        }
    },
}