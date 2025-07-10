// backend/controllers/googleAuthController.js
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// It's okay to leave it empty — audience is provided during verification
const client = new OAuth2Client();

exports.googleSignIn = async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Try to find existing user
    let user = await User.findOne({ email });

    // If user doesn't exist, create new one
    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        password: "", // Not used for Google auth
        isAdmin: false,
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Return token + user info (excluding password)
    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone || "",
        goal: user.goal || "",
        isAdmin: user.isAdmin || false,
      },
    });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(401).json({ message: "Google authentication failed" });
  }
};
