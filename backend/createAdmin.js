const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
  await mongoose.connect("mongodb+srv://HealthCareTemplate:0Wsbq23SiDhaVjmx@heathcaretemplate.c2pqyqx.mongodb.net/?retryWrites=true&w=majority&appName=HeathCareTemplate");

  const existingAdmin = await User.findOne({ email: "admin2@owh.com" }); // ✅ new check

  if (existingAdmin) {
    console.log("Admin already exists");
    return process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin456", 10); // ✅ new password

  const adminUser = new User({
    name: "New Admin",
    email: "admin2@owh.com",
    password: hashedPassword,
    phone: "8888888888",
    avatar: "",
    goal: "Oversee platform",
    isAdmin: true
  });

  await adminUser.save();
  console.log("✅ Admin user created");
  process.exit();
}

createAdmin().catch(err => {
  console.error("❌ Error creating admin:", err);
  process.exit(1);
});
