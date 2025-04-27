
// data/insertPosts.js
const mongoose = require("mongoose");
const Post = require("../models/Post");
require("dotenv").config();
const connectDB = require("../config/db");


const posts = [
  {
    title: "Exploring Internship Opportunities within the GitHub Community",
    url: "https://github.com/orgs/community/discussions/139657",
    description: "A tech enthusiast is seeking internship opportunities...",
  },
  {
    title: "Top 10 Developer Communities You Should Explore",
    url: "https://www.qodo.ai/blog/top-10-developer-communities-you-should-explore/",
    description: "An insightful article discussing various developer communities...",
  },
];

const insertData = async () => {
  try {
    await connectDB();
    await Post.insertMany(posts);
    console.log("Sample posts inserted");
    mongoose.connection.close();
  } catch (err) {
    console.error("Insertion Error:", err);
  }
};

insertData();