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
    default: "user"
  },
  phone: String,       // ✅ Add this
  goal: String,        // ✅ And this
  avatar: String,
  isAdmin: { type: Boolean, default: false },       // ✅ And this
  createdAt: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("User", userSchema);


