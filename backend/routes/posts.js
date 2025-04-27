// routes/posts.js
const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Fetch all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({
            datePosted: -1
        });
        res.json(posts);
    } catch (err) {
        res.status(500).json({
            error: "Error fetching posts"
        });
    }
});

// API Route to add a new post
router.post("/", async (req, res) => {
    try {
        const {
            title,
            description,
            url
        } = req.body;
        const newPost = new Post({
            title,
            description,
            url
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({
            error: "Error saving post"
        });
    }
});


module.exports = router;