const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // Create and save user without hashing password
        user = new User({ username, email, password });
        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Respond with token and user ID
        res.status(201).json({ msg: "User registered successfully", token, userId: user._id});

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found!" });

        // Validate password (without hashing)
        if (password !== user.password) {
            return res.status(400).json({ msg: "Invalid credentials!" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Send back token and user ID
        res.json({ token, userId: user._id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
