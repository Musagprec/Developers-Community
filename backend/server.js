// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const forumRoutes = require("./routes/forumRoutes");
const postRoutes = require("./routes/posts");
const projectRoutes = require("./routes/projects");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const userRoutes = require("./routes/users");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
// import "./config/passport.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
  
  // Routes

// MongoDB Connection
connectDB();

// Routes
app.use("/api/forums", forumRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));