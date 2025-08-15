const Event = require('../models/event');

/**
 * Create a new event (admin only)
 */
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      createdBy: req.user.id // from auth middleware
    });

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all events (public)
 */
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get a single event by ID (public)
 */
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update an event (admin only)
 */
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, location },
      { new: true }
    );

    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event updated successfully', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete an event (admin only)
 */
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
