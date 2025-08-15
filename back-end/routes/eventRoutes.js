const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

const auth = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

// Public: Get all events
router.get('/', getEvents);

// Public: Get single event
router.get('/:id', getEventById);

// Admin only: Create event
router.post('/', auth, adminOnly, createEvent);

// Admin only: Update event
router.put('/:id', auth, adminOnly, updateEvent);

// Admin only: Delete event
router.delete('/:id', auth, adminOnly, deleteEvent);

module.exports = router;
