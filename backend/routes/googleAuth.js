// routes/googleAuth.js
const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(); // You don't need to pass CLIENT_ID here, it's passed during token verification

router.post("/", async (req, res) => {
  const { credential } = req.body; // ✅ Match frontend payload name (`credential`)

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      // New user created with default phone and goal
      user = await User.create({
        name,
        email,
        avatar: picture,
        password: "", // not used for Google login
        phone: "",
        goal: "general-wellness",
        isAdmin: false,
      });
    }

    // Create JWT for client-side auth
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token: accessToken,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        goal: user.goal,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Google sign-in error:", error.message);
    res.status(401).json({ success: false, message: "Invalid Google token" });
  }
});

module.exports = router;