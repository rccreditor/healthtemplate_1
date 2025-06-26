const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Inquiry = require("../models/Inquiry");

// GET /api/admin/stats
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const monthlyRevenue = totalUsers * 99; // Example logic: ₹99 per user
    const siteVisits = 15000 + Math.floor(Math.random() * 2000); // Mock data

    const inquiryCount = await Inquiry.countDocuments();
    const inquiryTypes = await Inquiry.aggregate([
      { $group: { _id: "$interest", count: { $sum: 1 } } }
    ]);

    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);

    const usersPerWeek = await User.aggregate([
      {
        $group: {
          _id: { $week: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      totalUsers,
      monthlyRevenue,
      siteVisits,
      newInquiries: inquiryCount,
      inquiryTypes,
      recentInquiries,
      usersPerWeek
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
