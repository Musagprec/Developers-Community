const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const connectDB = require("../config/db");

dotenv.config();


const users = [
  { _id: new mongoose.Types.ObjectId(),username: "Alice", name: "Alice Johnson", email: "alice@example.com", password: "hashedpassword1" },
  { _id: new mongoose.Types.ObjectId(),username: "Bob",  name: "Bob Smith", email: "bob@example.com", password: "hashedpassword2" },
  { _id: new mongoose.Types.ObjectId(),username: "Charlie",  name: "Charlie Brown", email: "charlie@example.com", password: "hashedpassword3" },
];

const insertUsers = async () => {
  try {
    await connectDB();
    await User.insertMany(users);
    console.log("Users inserted successfully");
    console.log("User IDs:", users.map(u => u._id)); // Store these IDs for project creation
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting users:", error);
    mongoose.connection.close();
  }
};

insertUsers();
