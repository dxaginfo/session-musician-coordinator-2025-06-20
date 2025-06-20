const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const MusicianProfile = require('../models/MusicianProfile');
const ClientProfile = require('../models/ClientProfile');

/**
 * @desc    Get all musicians
 * @route   GET /api/users/musicians
 * @access  Public
 */
const getMusicians = asyncHandler(async (req, res) => {
  // Build query based on filters
  const query = { userType: 'musician' };
  
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find(query)
    .select('-password')
    .skip(skip)
    .limit(limit);

  // Get total count for pagination info
  const totalCount = await User.countDocuments(query);

  // Get musician profiles for these users
  const userIds = users.map(user => user._id);
  const musicianProfiles = await MusicianProfile.find({ userId: { $in: userIds } });

  // Combine user data with musician profile data
  const musiciansWithProfiles = users.map(user => {
    const profile = musicianProfiles.find(
      profile => profile.userId.toString() === user._id.toString()
    ) || null;
    
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      createdAt: user.createdAt,
      profile: profile
    };
  });

  res.json({
    musicians: musiciansWithProfiles,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
    totalCount
  });
});

/**
 * @desc    Get musician by ID
 * @route   GET /api/users/musicians/:id
 * @access  Public
 */
const getMusicianById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user || user.userType !== 'musician') {
    res.status(404);
    throw new Error('Musician not found');
  }

  const musicianProfile = await MusicianProfile.findOne({ userId: user._id });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    userType: user.userType,
    createdAt: user.createdAt,
    profile: musicianProfile
  });
});

/**
 * @desc    Create or update musician profile
 * @route   POST /api/users/musicians/profile
 * @access  Private (Musician only)
 */
const createUpdateMusicianProfile = asyncHandler(async (req, res) => {
  // Check if user is a musician
  if (req.user.userType !== 'musician') {
    res.status(403);
    throw new Error('Only musicians can create musician profiles');
  }

  // Check if profile already exists
  let profile = await MusicianProfile.findOne({ userId: req.user._id });

  if (profile) {
    // Update existing profile
    profile = await MusicianProfile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: req.body },
      { new: true }
    );
  } else {
    // Create new profile
    profile = await MusicianProfile.create({
      userId: req.user._id,
      ...req.body
    });
  }

  res.json(profile);
});

/**
 * @desc    Get all clients
 * @route   GET /api/users/clients
 * @access  Private (Admin only)
 */
const getClients = asyncHandler(async (req, res) => {
  // Check if user is admin
  if (req.user.userType !== 'admin') {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const clients = await User.find({ userType: 'client' })
    .select('-password')
    .skip(skip)
    .limit(limit);

  const totalCount = await User.countDocuments({ userType: 'client' });

  res.json({
    clients,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
    totalCount
  });
});

/**
 * @desc    Get client by ID
 * @route   GET /api/users/clients/:id
 * @access  Private
 */
const getClientById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user || user.userType !== 'client') {
    res.status(404);
    throw new Error('Client not found');
  }

  // Check if user is admin or the client themself
  if (req.user.userType !== 'admin' && req.user._id.toString() !== user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to access this resource');
  }

  const clientProfile = await ClientProfile.findOne({ userId: user._id });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    userType: user.userType,
    createdAt: user.createdAt,
    profile: clientProfile
  });
});

/**
 * @desc    Create or update client profile
 * @route   POST /api/users/clients/profile
 * @access  Private (Client only)
 */
const createUpdateClientProfile = asyncHandler(async (req, res) => {
  // Check if user is a client
  if (req.user.userType !== 'client') {
    res.status(403);
    throw new Error('Only clients can create client profiles');
  }

  // Check if profile already exists
  let profile = await ClientProfile.findOne({ userId: req.user._id });

  if (profile) {
    // Update existing profile
    profile = await ClientProfile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: req.body },
      { new: true }
    );
  } else {
    // Create new profile
    profile = await ClientProfile.create({
      userId: req.user._id,
      ...req.body
    });
  }

  res.json(profile);
});

module.exports = {
  getMusicians,
  getMusicianById,
  createUpdateMusicianProfile,
  getClients,
  getClientById,
  createUpdateClientProfile,
};
