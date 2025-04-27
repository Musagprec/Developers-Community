const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String, required: false },
  name: { type: String, required: false },
  rollno: { type: String, required: false, unique: false },
  phoneno: { type: String, required: false, unique: false },
  year: { type: Number, required: false },
  branch: { type: String, required: false },
  semester: { type: Number, required: false },
  skills: [{ type: String }], // List of skills
  projects: [
    {
      title: String,
      description: String,
      github: String,
      techStack: [String],
    },
  ],
  socialMedia: {
    linkedin: String,
    github: String,
    twitter: String,
    portfolio: String,
  },
  bio: { type: String },
  googleId: { type: String },

});

const User = mongoose.model("User", userSchema);
module.exports = User;
