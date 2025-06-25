const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,  // We'll hash this later
  role: {
    type: String,
    default: "user" // Or "admin"
  }
});

module.exports = mongoose.model("User", userSchema);
