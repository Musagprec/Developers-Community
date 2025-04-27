require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Forum = require("../models/forumModel");

const forumsList = [
  { name: "Web Development", description: "All about building websites and web apps.", followers: 3200 },
  { name: "Machine Learning", description: "Dive into AI, algorithms, and data science.", followers: 2800 },
  { name: "UI/UX Designing", description: "Discuss design principles and share UI/UX projects.", followers: 1500 },
  { name: "Mobile Development", description: "Everything about building iOS & Android apps.", followers: 2200 },
  { name: "Cybersecurity", description: "Talk about securing systems and ethical hacking.", followers: 1800 },
  { name: "Game Development", description: "Share game projects & discuss Unity and Unreal.", followers: 1200 },
  { name: "Data Science", description: "From data wrangling to visualization.", followers: 2500 },
  { name: "Cloud Computing", description: "Explore AWS, Azure, and GCP.", followers: 1400 },
  { name: "DevOps", description: "CI/CD, Docker, Kubernetes.", followers: 1600 },
  { name: "Blockchain", description: "Smart contracts and dApps.", followers: 1700 },
];

const insertData = async () => {
  try {
    await connectDB();
    await Forum.deleteMany();
    await Forum.insertMany(forumsList);
    console.log("✅ Forums inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting forums:", error);
    mongoose.connection.close();
  }
};

insertData();
