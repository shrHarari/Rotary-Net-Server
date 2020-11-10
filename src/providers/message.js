
const { Message } = require('../models');
const { PersonCard } = require('../models');
const mongoose = require('mongoose')

const _getMessagesList = async () => {
    try {
        const messages = await Message.find().lean().exec();
        return messages;
    }
    catch(ex) {
        console.log(`cannot get Messages List from db. ${ex}`);
        return Promise.reject();
    }
};

const _getMessageById = async (messageId) => {
    try {
        const message = await Message.findOne({
            _id: mongoose.Types.ObjectId(messageId)
        }).lean().exec();
        return message;
    }
    catch(ex) {
        console.log(`cannot get Message By Id from db. ${ex}`);
        return Promise.reject();
    }
};

const _getMessagedByIdPopulated = async (messageId) => {
    try {
        const message = await Message.findOne(
            {_id: mongoose.Types.ObjectId(messageId)})
                .populate("personCards")
        return message;
    }
    catch(ex) {
        console.log(`cannot get Message by Id Populated from db. ${ex}`);
        return Promise.reject();
    }
};

const _getMessagesListByComposerId = async (composerId) => {
    try {
        const messages = await Message.find({
            composerId: mongoose.Types.ObjectId(composerId)
        }).lean().exec();
        return messages;
    }
    catch(ex) {
        console.log(`cannot get Messages List By ComposerId from db. ${ex}`);
        return Promise.reject();
    }
};

const _createMessage = async (message) => {
    
    // const session = await Message.startSession();
    // session.startTransaction();

    try {
        // const opts = { session };
        
        const personCardsList = message.personCards;
        // console.log(`personCardsList: ${personCardsList}`);

        const newMessage = new Message(message);
        const savedMessage = await newMessage.save();
        // const savedMessage = await newMessage.save(opts);
        
        let msgObj = {
            _id: savedMessage._id,
            messageReadStatus: true,
        };

        personCardsList.forEach(function(personCardId) 
        { 
            PersonCard.findOneAndUpdate(
                { _id: personCardId },
                { $addToSet: { messages: msgObj } },
                { new: true, useFindAndModify: false, upsert: true }
                // { new: true, useFindAndModify: false, upsert: true, opts }
            ).exec();
        });

        // await session.commitTransaction();
        // session.endSession();

        return savedMessage;
    }
    catch(ex) {
        console.log(`cannot create Message in db. ${ex}`);
        // await session.abortTransaction();
        // session.endSession();
        return Promise.reject();
    }
};

const _updateMessage = async (messageId, message) => {
    try {
        await Message.findByIdAndUpdate({
            _id: messageId
        }, message);
        return;
    }
    catch(ex) {
        console.log(`cannot update Message to db. ${ex}`);
        return Promise.reject();
    }
};

const _deleteMessage = async (messageId) => {
    try {

        const personCardsList = await Message.find( 
            {_id: messageId} )
            .select('personCards')
            .lean().exec();

        personCardsList.forEach(function(personCardId) 
        { 
            PersonCard.updateOne(
                { _id: personCardId }, 
                { $pull: { messages: messageId } },
            ).exec();
        });
        
        await Message.deleteOne({_id: messageId});

        return;
    }
    catch(ex) {
        console.log(`cannot delete Message from db. ${ex}`);
        return Promise.reject();
    }
};

const _removeMessageFromPersonCardMessageQueue = async (messageId, personCardId) => {
    try {

        Message.updateOne(
            { _id: messageId }, 
            { $pull: { personCards: personCardId } },
        ).exec();

        PersonCard.updateOne(
            { _id: personCardId }, 
            { $pull: { messages: messageId } },
        ).exec();

        return;
    }
    catch(ex) {
        console.log(`cannot remove Message From PersonCard MessageQueue from db. ${ex}`);
        return Promise.reject();
    }
};

const _addMessageBackToPersonCardMessageQueue = async (messageId, personCardId) => {
    try {
        console.log(`messageId: ${messageId}`);
        console.log(`personCardId: ${personCardId}`);

        Message.updateOne(
            { _id: messageId }, 
            { $push: { personCards: personCardId } },
        ).exec();

        PersonCard.updateOne(
            { _id: personCardId }, 
            { $push: { messages: messageId } },
        ).exec();

        return;
    }
    catch(ex) {
        console.log(`cannot add Message Back To PersonCard MessageQueue in db. ${ex}`);
        return Promise.reject();
    }
};


module.exports = {
    getMessagesList: () => {
        return _getMessagesList();
    },

    getMessageById: (messageId) => {
        return _getMessageById(messageId);
    },

    getMessageByIdPopulated: (messageId) => {
        return _getMessagedByIdPopulated(messageId);
    },
    
    getMessagesListByComposerId: (composerId) => {
        return _getMessagesListByComposerId(composerId);
    },

    createMessage: (message) => {
        return _createMessage(message);
    },

    updateMessage: (messageId, message) => {
        return _updateMessage(messageId, message);
    },

    deleteMessage: (messageId) => {
        return _deleteMessage(messageId);
    },

    removeMessageFromPersonCardMessageQueue: (messageId, personCardId) => {
        return _removeMessageFromPersonCardMessageQueue(messageId, personCardId);
    },

    addMessageBackToPersonCardMessageQueue: (messageId, personCardId) => {
        return _addMessageBackToPersonCardMessageQueue(messageId, personCardId);
    }
}