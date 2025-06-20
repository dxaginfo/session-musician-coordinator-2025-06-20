const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const Application = require('../models/Application');

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Private (Client only)
 */
const createProject = asyncHandler(async (req, res) => {
  // Check if user is a client
  if (req.user.userType !== 'client') {
    res.status(403);
    throw new Error('Only clients can create projects');
  }

  const { title, description, requirements, budget, timeline, visibility } = req.body;

  const project = await Project.create({
    clientId: req.user._id,
    title,
    description,
    requirements: requirements || [],
    budget: budget || { min: 0, max: 0, type: 'fixed' },
    timeline: timeline || { startDate: null, endDate: null, flexibility: 'flexible' },
    visibility: visibility || 'public',
    status: 'open'
  });

  res.status(201).json(project);
});

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public/Private
 */
const getProjects = asyncHandler(async (req, res) => {
  // Build query based on filters
  const query = {};
  
  // Status filter
  if (req.query.status) {
    query.status = req.query.status;
  }
  
  // If not logged in or not a client, only show public projects
  if (!req.user || req.user.userType !== 'client') {
    query.visibility = 'public';
  }
  
  // If client wants to see only their projects
  if (req.query.myProjects === 'true' && req.user && req.user.userType === 'client') {
    query.clientId = req.user._id;
  }
  
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const projects = await Project.find(query)
    .populate('clientId', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // Get total count for pagination info
  const totalCount = await Project.countDocuments(query);

  res.json({
    projects,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
    totalCount
  });
});

/**
 * @desc    Get project by ID
 * @route   GET /api/projects/:id
 * @access  Public/Private
 */
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('clientId', 'name email');

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check visibility permissions
  if (project.visibility !== 'public') {
    // If not public, user must be logged in
    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized to view this project');
    }
    
    // If private, only the owner can see it
    if (project.visibility === 'private' && 
        req.user._id.toString() !== project.clientId._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to view this private project');
    }
    
    // If invite-only, check if user is invited (should check applications)
    if (project.visibility === 'invite-only' && 
        req.user._id.toString() !== project.clientId._id.toString()) {
      // Check if user is invited (has an application with invited status)
      const isInvited = await Application.exists({
        projectId: project._id,
        musicianId: req.user._id,
        status: 'invited'
      });
      
      if (!isInvited) {
        res.status(403);
        throw new Error('Not authorized to view this invite-only project');
      }
    }
  }

  // Get applications for the project if user is the owner
  let applications = [];
  if (req.user && req.user._id.toString() === project.clientId._id.toString()) {
    applications = await Application.find({ projectId: project._id })
      .populate('musicianId', 'name email');
  }

  // Get user's own application if they're a musician
  let userApplication = null;
  if (req.user && req.user.userType === 'musician') {
    userApplication = await Application.findOne({
      projectId: project._id,
      musicianId: req.user._id
    });
  }

  res.json({
    ...project._doc,
    applications: applications.length > 0 ? applications : undefined,
    userApplication: userApplication ? userApplication : undefined
  });
});

/**
 * @desc    Update a project
 * @route   PUT /api/projects/:id
 * @access  Private (Project owner only)
 */
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user is the project owner
  if (req.user._id.toString() !== project.clientId.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this project');
  }

  // Update fields
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  ).populate('clientId', 'name email');

  res.json(updatedProject);
});

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Private (Project owner only)
 */
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user is the project owner
  if (req.user._id.toString() !== project.clientId.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this project');
  }

  // Delete all applications for this project
  await Application.deleteMany({ projectId: project._id });
  
  // Delete the project
  await project.remove();

  res.json({ message: 'Project removed' });
});

/**
 * @desc    Apply to a project
 * @route   POST /api/projects/:id/apply
 * @access  Private (Musicians only)
 */
const applyToProject = asyncHandler(async (req, res) => {
  // Check if user is a musician
  if (req.user.userType !== 'musician') {
    res.status(403);
    throw new Error('Only musicians can apply to projects');
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if project is open
  if (project.status !== 'open') {
    res.status(400);
    throw new Error('This project is not accepting applications');
  }

  // Check if already applied
  const existingApplication = await Application.findOne({
    projectId: project._id,
    musicianId: req.user._id
  });

  if (existingApplication) {
    res.status(400);
    throw new Error('You have already applied to this project');
  }

  const { proposal, rate, availability } = req.body;

  const application = await Application.create({
    projectId: project._id,
    musicianId: req.user._id,
    proposal,
    rate,
    availability: availability || [],
    status: 'pending'
  });

  res.status(201).json(application);
});

/**
 * @desc    Update application status
 * @route   PUT /api/projects/:id/applications/:applicationId
 * @access  Private (Project owner only)
 */
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user is the project owner
  if (req.user._id.toString() !== project.clientId.toString()) {
    res.status(403);
    throw new Error('Not authorized to update applications for this project');
  }

  const application = await Application.findById(req.params.applicationId);

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  // Check if application belongs to the project
  if (application.projectId.toString() !== project._id.toString()) {
    res.status(400);
    throw new Error('Application does not belong to this project');
  }

  // Update application status
  application.status = req.body.status;
  await application.save();

  res.json(application);
});

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  applyToProject,
  updateApplicationStatus,
};
