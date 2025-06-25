const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST: Add appointment
router.post("/", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: List all appointments
router.get("/", async (req, res) => {
  try {
    const all = await Appointment.find();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
