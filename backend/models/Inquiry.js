const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  interest: String,
  status: {
    type: String,
    enum: ["new", "replied"],
    default: "new"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Inquiry", inquirySchema);
