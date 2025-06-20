const mongoose = require('mongoose');

const musicianProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    instruments: [
      {
        instrument: {
          type: String,
          required: true,
        },
        yearsExperience: {
          type: Number,
          default: 0,
        },
        skillLevel: {
          type: String,
          enum: ['beginner', 'intermediate', 'advanced', 'professional'],
          default: 'intermediate',
        },
      },
    ],
    genres: [
      {
        type: String,
      },
    ],
    hourlyRate: {
      type: Number,
      default: 0,
    },
    dayRate: {
      type: Number,
      default: 0,
    },
    projectRate: {
      type: Number,
      default: 0,
    },
    availability: {
      availableDays: {
        monday: { type: Boolean, default: true },
        tuesday: { type: Boolean, default: true },
        wednesday: { type: Boolean, default: true },
        thursday: { type: Boolean, default: true },
        friday: { type: Boolean, default: true },
        saturday: { type: Boolean, default: true },
        sunday: { type: Boolean, default: true },
      },
      availableHours: {
        start: { type: String, default: '09:00' },
        end: { type: String, default: '17:00' },
      },
      specialDates: [
        {
          date: { type: Date },
          available: { type: Boolean, default: false },
        },
      ],
    },
    portfolio: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: '',
        },
        fileUrl: {
          type: String,
          required: true,
        },
        thumbnailUrl: {
          type: String,
          default: '',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    equipment: [
      {
        type: String,
      },
    ],
    credits: [
      {
        projectName: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        artist: {
          type: String,
          default: '',
        },
        year: {
          type: Number,
        },
        url: {
          type: String,
          default: '',
        },
      },
    ],
    ratings: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MusicianProfile', musicianProfileSchema);
