const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    requirements: [
      {
        instrument: {
          type: String,
          required: true,
        },
        genre: {
          type: String,
          default: '',
        },
        details: {
          type: String,
          default: '',
        },
      },
    ],
    budget: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 0,
      },
      type: {
        type: String,
        enum: ['hourly', 'fixed', 'negotiable'],
        default: 'fixed',
      },
    },
    timeline: {
      startDate: {
        type: Date,
        default: null,
      },
      endDate: {
        type: Date,
        default: null,
      },
      flexibility: {
        type: String,
        enum: ['strict', 'flexible', 'negotiable'],
        default: 'flexible',
      },
    },
    status: {
      type: String,
      enum: ['draft', 'open', 'in-progress', 'completed', 'cancelled'],
      default: 'draft',
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'invite-only'],
      default: 'public',
    },
    attachments: [
      {
        name: {
          type: String,
          required: true,
        },
        fileUrl: {
          type: String,
          required: true,
        },
        fileType: {
          type: String,
          default: '',
        },
        fileSize: {
          type: Number,
          default: 0,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
