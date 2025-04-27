const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");

// Set up storage for Multer
// 🔹 Multer Storage Configuration
const storage = multer.diskStorage({
    destination: "uploads/", // Save images in the "uploads" folder
    filename: async (req, file, cb) => {
      try {
        const userId = req.params.id;
        const ext = path.extname(file.originalname); // Get file extension
        const filename = `${userId}-${Date.now()}${ext}`; // Format: userID-timestamp.extension
  
        // Optional: Delete old profile picture if exists
        const user = await User.findById(userId);
        if (user && user.image) {
          const oldImagePath = path.join(__dirname, user.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Delete old image
          }
        }
  
        cb(null, filename);
      } catch (error) {
        cb(error);
      }
    },
  });
  

const upload = multer({
    storage
});

// Upload image route
// Upload Profile Image
router.post("/:id/upload", upload.single("image"), async (req, res) => {
    try {
      const imageUrl = `/uploads/${req.file.filename}`;
  
      // Update user profile with new image URL
      const user = await User.findByIdAndUpdate(req.params.id, { image: imageUrl }, { new: true });
  
      res.json({ imageUrl });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


// Get All Users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

// Get User by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({
            error: "User not found"
        });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

// Update user profile
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Insert Dummy Users
router.post("/insertDummyUsers", async (req, res) => {
    try {
        const dummyUsers = [


            {
                image: "https://randomuser.me/api/portraits/women/18.jpg",
                username: "isha_skapoor",
                password: "hashedpassword",
                name: "Isha Kapoor",
                rollno: "20CS126",
                email: "ishas@example.com",
                phoneno: "9876541415",
                year: 1,
                branch: "CSE",
                semester: 2,
                skills: ["JavaScript", "CSS", "HTML"],
                projects: [{
                    title: "Landing Page",
                    description: "A responsive landing page",
                    github: "https://github.com/isha/landing-page",
                    techStack: ["HTML", "CSS", "JavaScript"],
                }, ],
                socialMedia: {
                    linkedin: "https://linkedin.com/in/isha",
                    github: "https://github.com/isha",
                    twitter: "https://twitter.com/isha_dev",
                    portfolio: "https://isha.dev",
                },
                bio: "Frontend Developer and Designer",
            },
            {
                image: "https://randomuser.me/api/portraits/men/20.jpg",
                username: "vikram_raj",
                password: "hashedpassword",
                name: "Vikram Raj",
                rollno: "20CS150",
                email: "vikram@example.com",
                phoneno: "9876543416",
                year: 3,
                branch: "CSE",
                semester: 6,
                skills: ["Flutter", "Dart", "Firebase"],
                projects: [{
                    title: "Food Delivery App",
                    description: "A cross-platform food delivery app",
                    github: "https://github.com/vikram/food-app",
                    techStack: ["Flutter", "Dart", "Firebase"],
                }, ],
                socialMedia: {
                    linkedin: "https://linkedin.com/in/vikram",
                    github: "https://github.com/vikram",
                    twitter: "https://twitter.com/vikram_dev",
                    portfolio: "https://vikram.dev",
                },
                bio: "Mobile App Developer | Flutter Enthusiast",
            },
        ];

        await User.insertMany(dummyUsers);
        res.status(201).json({
            message: "Dummy users inserted successfully!"
        });
    } catch (error) {
        console.error("Error inserting dummy users:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

module.exports = router;