const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Project = require("../models/Project");
const connectDB = require("../config/db");

dotenv.config();

// Replace these IDs with actual user IDs from your database
const userIds = [
  "65c1a6b0e13a4f001d5b6a01", // Alice
  "65c1a6b0e13a4f001d5b6a02", // Bob
  "65c1a6b0e13a4f001d5b6a03", // Charlie
];

const projects = [
  { 
    title: "AI Chatbot", 
    description: "An AI-powered chatbot for customer support.", 
    image: "/photoprint.webp",
    techStack: ["React", "Node.js", "AI"],
    github: "https://github.com/yourrepo",
    createdBy: userIds[0], // Alice
    members: [userIds[1], userIds[2]] // Bob and Charlie joined
  },
  { 
    title: "Portfolio Website", 
    description: "A beautiful portfolio for developers.", 
    image: "/photoprint.webp",
    techStack: ["Next.js", "Tailwind", "Firebase"],
    github: "https://github.com/yourrepo",
    createdBy: userIds[1], // Bob
    members: [userIds[0]] // Alice joined
  },
  { 
    title: "E-Commerce App", 
    description: "A full-stack e-commerce application with cart & payments.", 
    image: "/photoprint.webp",
    techStack: ["React", "MongoDB", "Express.js"],
    github: "https://github.com/yourrepo",
    createdBy: userIds[2], // Charlie
    members: [userIds[0], userIds[1]] // Alice and Bob joined
  }
];

const insertProjects = async () => {
  try {
    await connectDB();

    await Project.insertMany(projects);
    console.log("Projects inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting projects:", error);
    mongoose.connection.close();
  }
};

insertProjects();
