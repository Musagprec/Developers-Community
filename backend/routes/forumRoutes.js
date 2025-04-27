const express = require("express");
const Forum = require("../models/forumModel");

const router = express.Router();

// Get all forums
router.get("/", async (req, res) => {
  try {
    const forums = await Forum.find();
    res.json(forums);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forums", error });
  }
});

// Join a forum
router.post("/:forumId/join", async (req, res) => {
  try {
    const { forumId } = req.params;
    const { userId } = req.body; // Assuming userId is sent from the frontend

    const forum = await Forum.findById(forumId);
    if (!forum) return res.status(404).json({ message: "Forum not found" });

    if (!forum.joinedUsers.includes(userId)) {
      forum.joinedUsers.push(userId);
      forum.followers += 1;
      await forum.save();
    }

    res.json({ message: "Joined successfully", forum });
  } catch (error) {
    res.status(500).json({ message: "Error joining forum", error });
  }
});

// Leave a forum
router.post("/:forumId/leave", async (req, res) => {
  try {
    const { forumId } = req.params;
    const { userId } = req.body;

    const forum = await Forum.findById(forumId);
    if (!forum) return res.status(404).json({ message: "Forum not found" });

    if (forum.joinedUsers.includes(userId)) {
      forum.joinedUsers = forum.joinedUsers.filter((id) => id !== userId);
      forum.followers -= 1;
      await forum.save();
    }

    res.json({ message: "Left successfully", forum });
  } catch (error) {
    res.status(500).json({ message: "Error leaving forum", error });
  }
});

module.exports = router;
