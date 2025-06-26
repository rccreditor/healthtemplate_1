const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // ✅ Required

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Include isAdmin in the response
    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
