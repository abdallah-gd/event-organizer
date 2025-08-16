const express = require('express');
const router = express.Router();
const { createRSVP, getEventRSVPs, getMyRSVPs, checkIn } = require('../controllers/RSVPController');
const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware'); // we'll make this

// Create RSVP (logged-in users only)
router.post('/', auth, createRSVP);

// Get RSVPs for a specific event (admin only)
router.get('/event/:eventId', auth, adminOnly, getEventRSVPs);

// Get RSVPs for logged-in user
router.get('/me', auth, getMyRSVPs);

// Check-in via QR code (no auth needed)
router.get('/checkin/:id', checkIn);

module.exports = router;
