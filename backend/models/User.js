// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  role: {
    type: String,
    default: "user" // This is fine to keep, though your logic relies on isAdmin
  },
  phone: String,
  goal: String,
  avatar: String,
  isAdmin: { // ✅ This is the single, correct definition
    type: Boolean,
    default: false 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // The duplicate isAdmin field has been removed
});

module.exports = mongoose.model("User", userSchema);