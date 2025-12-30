import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getMyEvents
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/my-events", protect, getMyEvents);
router.get("/:id", getEventById);
router.post("/", protect, createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
