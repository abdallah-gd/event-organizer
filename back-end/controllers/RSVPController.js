const RSVP = require('../models/RSVP');
const Event = require('../models/event');
const QRCode = require('qrcode');

/**
 * Create a new RSVP for an event (and generate a QR code)
 */
exports.createRSVP = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id; // from auth middleware

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Prevent duplicate RSVPs
    const existingRSVP = await RSVP.findOne({ event: eventId, attendee: userId });
    if (existingRSVP) {
      return res.status(400).json({ message: 'You have already RSVP’d to this event' });
    }

    // Create RSVP
    const rsvp = await RSVP.create({
      event: eventId,
      attendee: userId
    });

    // Generate QR code with RSVP ID
    const checkInUrl = `http://localhost/rsvp/checkin/${rsvp._id}`;
    const qrCodeDataUrl = await QRCode.toDataURL(checkInUrl);

    rsvp.qrCode = qrCodeDataUrl;
    await rsvp.save();

    res.status(201).json({ message: 'RSVP created', rsvp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get RSVPs for a specific event (admin only)
 */
exports.getEventRSVPs = async (req, res) => {
  try {
    const { eventId } = req.params;
    const rsvps = await RSVP.find({ event: eventId })
      .populate('attendee', 'name email')
      .populate('event', 'title date');

    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get RSVPs for the logged-in user
 */
exports.getMyRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find({ attendee: req.user.id })
      .populate('event', 'title date location');

    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Check-in using RSVP ID from QR code
 */
exports.checkIn = async (req, res) => {
  try {
    const { id } = req.params;

    const rsvp = await RSVP.findById(id);
    if (!rsvp) return res.status(404).json({ message: 'RSVP not found' });

    rsvp.checkedIn = true;
    await rsvp.save();

    res.json({ message: 'Check-in successful', rsvp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
