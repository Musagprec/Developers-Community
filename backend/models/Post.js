// models/Post.js
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    datePosted: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Post", PostSchema);