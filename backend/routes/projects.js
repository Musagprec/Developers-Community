const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const User = require("../models/User");

router.get("/public", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.get("/private", async (req, res) => {
  const userId = req.query.userId;
  const projects = await Project.find({ members: userId });
  res.json(projects);
});

router.post("/create", async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json({ message: "Project added!", project });
});

router.post("/join/:id", async (req, res) => {
  const userId = req.body.userId;
  await Project.findByIdAndUpdate(req.params.id, { $addToSet: { members: userId } });
  res.json({ message: "Joined project!" });
});

router.post("/leave/:id", async (req, res) => {
  const userId = req.body.userId;
  await Project.findByIdAndUpdate(req.params.id, { $pull: { members: userId } });
  res.json({ message: "Left project!" });
});


module.exports = router;