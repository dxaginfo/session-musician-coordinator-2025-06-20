const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    userType: {
      type: String,
      enum: ['musician', 'client', 'admin'],
      default: 'client',
    },
    location: {
      country: {
        type: String,
        default: '',
      },
      city: {
        type: String,
        default: '',
      },
    },
    timezone: {
      type: String,
      default: 'UTC',
    },
    bio: {
      type: String,
      default: '',
    },
    profileImage: {
      type: String,
      default: '',
    },
    contactInfo: {
      phone: {
        type: String,
        default: '',
      },
      website: {
        type: String,
        default: '',
      },
      socialMedia: {
        facebook: {
          type: String,
          default: '',
        },
        twitter: {
          type: String,
          default: '',
        },
        instagram: {
          type: String,
          default: '',
        },
        linkedin: {
          type: String,
          default: '',
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
