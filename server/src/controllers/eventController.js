import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user.id, // use the user ID from middleware
    });

    res.status(201).json({ message: "Event created", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUBLIC – for homepage & events page
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PRIVATE – for dashboard
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ message: "Event retrieved", event });
};

export const updateEvent = async (req, res) => { 
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  // Compare with req.user.id instead of req.user
  if (event.createdBy.toString() !== req.user.id)
    return res.status(401).json({ message: "Unauthorized" });

  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.json({ message: "Event updated", event: updated });
};


export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.createdBy.toString() !== req.user.id)
    return res.status(401).json({ message: "Unauthorized" });

  await event.deleteOne();
  res.json({ message: "Event deleted" });
};
