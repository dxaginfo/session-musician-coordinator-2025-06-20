const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    musicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    proposal: {
      type: String,
      required: [true, 'Please add a proposal'],
    },
    rate: {
      type: Number,
      required: [true, 'Please specify your rate'],
    },
    availability: [
      {
        date: {
          type: Date,
          required: true,
        },
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'invited'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', applicationSchema);
