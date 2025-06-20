const mongoose = require('mongoose');

const clientProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      default: '',
    },
    studioInfo: {
      name: {
        type: String,
        default: '',
      },
      location: {
        address: {
          type: String,
          default: '',
        },
        city: {
          type: String,
          default: '',
        },
        state: {
          type: String,
          default: '',
        },
        country: {
          type: String,
          default: '',
        },
        postalCode: {
          type: String,
          default: '',
        },
      },
      description: {
        type: String,
        default: '',
      },
      website: {
        type: String,
        default: '',
      },
      equipment: [
        {
          type: String,
        },
      ],
      photos: [
        {
          type: String,
        },
      ],
    },
    projectHistory: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: '',
        },
        year: {
          type: Number,
        },
        artist: {
          type: String,
          default: '',
        },
        url: {
          type: String,
          default: '',
        },
      },
    ],
    preferredGenres: [
      {
        type: String,
      },
    ],
    paymentVerified: {
      type: Boolean,
      default: false,
    },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ClientProfile', clientProfileSchema);
