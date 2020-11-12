
const { Comment } = require('../models');
const mongoose = require('mongoose')

const _getCommentsList = async () => {
    try {
        const comments = await Comment.find().lean().exec();
        return comments;
    }
    catch(ex) {
        console.log(`cannot get Comments List from db. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {
    getCommentsList: () => {
        return _getCommentsList();
    }
}