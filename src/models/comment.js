const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    name: { type: String },
    email: { type: String },
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    text: { type: String },
    date: { type: Date }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;