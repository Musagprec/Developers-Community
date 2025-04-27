const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  followers: { type: Number, default: 0 },
  joinedUsers: [{ type: String }] // Store user IDs or usernames
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;
