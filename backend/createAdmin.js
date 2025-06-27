// createAdmin.js (Improved Version)

require("dotenv").config(); // ✅ Reads variables from .env file
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
  // Check if MONGO_URI is loaded
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI not found in .env file. Please add it.");
    process.exit(1);
  }
  
  // ✅ Connect using the same URI as your server
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB...");

  const adminEmail = "admin2@owh.com";
  const adminPassword = "admin456";

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log(`Admin with email '${adminEmail}' already exists.`);
    // Optionally update password if needed
    // const isMatch = await bcrypt.compare(adminPassword, existingAdmin.password);
    // if (!isMatch) {
    //   existingAdmin.password = await bcrypt.hash(adminPassword, 10);
    //   await existingAdmin.save();
    //   console.log("✅ Admin password has been updated.");
    // }
    return process.exit();
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = new User({
    name: "Platform Admin",
    email: adminEmail,
    password: hashedPassword,
    phone: "8888888888",
    avatar: "https://i.pravatar.cc/150?img=12",
    goal: "Oversee platform",
    isAdmin: true
  });

  await adminUser.save();
  console.log("✅ Admin user created successfully!");
  process.exit();
}

createAdmin().catch(err => {
  console.error("❌ Error creating admin:", err);
  process.exit(1);
});