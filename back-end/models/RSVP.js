const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  event: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true 
  },
  attendee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['going', 'not going'],
     default: 'going' 
    },
  checkedIn: { 
    type: Boolean, 
    default: false 
  },
  qrCode: String // store base64 or image URL
}, { timestamps: true });

module.exports = mongoose.model('RSVP', rsvpSchema);
