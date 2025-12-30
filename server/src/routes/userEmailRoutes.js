import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/users/emails
router.get("/emails", async (req, res) => {
  try {
    const users = await User.find({}, "email"); // fetch only emails
    const emails = users.map(user => user.email);
    res.json({ emails }); // send as { emails: [...] }
  } catch (err) {
    console.error(err);
    res.status(500).json({ emails: [], message: "Failed to fetch emails" });
  }
});

export default router;
