const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  message: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);
