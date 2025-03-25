import Garbage from "../models/garbageModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

/**
 * @route   POST /api/garbage
 * @desc    Create a new garbage collection request
 * @access  Private
 * @param   {Number} longitude - The longitude of the collection location (required)
 * @param   {Number} latitude - The latitude of the collection location (required)
 * @param   {String} typeOfGarbage - The type of garbage (required)
 * @param   {String} address - The address for garbage collection (required)
 * @param   {String} mobileNumber - The mobile number for contact (required)
 * @returns {Object} - A JSON object containing the newly created garbage request data
 */
const createGarbageRequest = asyncHandler(async (req, res) => {
  const { area, longitude, latitude, typeOfGarbage, address, mobileNumber } =
    req.body;

  if (
    !longitude ||
    !latitude ||
    !typeOfGarbage ||
    !area ||
    !address ||
    !mobileNumber
  ) {
    res.status(400);
    throw new Error("Please fill all required fields.");
  }

  // Find the user
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  // Create the garbage request
  const garbage = new Garbage({
    user: req.user._id,
    longitude,
    latitude,
    typeOfGarbage,
    area,
    address,
    mobileNumber,
  });

  const createdGarbage = await garbage.save();

  // Update user's ecoscore
  const currentEcoscore = parseInt(user.ecoscore || "0", 10); // Parse as integer with fallback to 0
  user.ecoscore = (currentEcoscore + 200).toString(); // Initialize ecoscore if it doesn't exist
  await user.save();

  res.status(201).json(createdGarbage);
});

/**
 * @route   GET /api/garbage
 * @desc    Get all garbage requests (Admin only)
 * @access  Private/Admin
 * @returns {Array} - A list of all garbage collection requests
 */
const getAllGarbageRequests = asyncHandler(async (req, res) => {
  const garbageRequests = await Garbage.find({}).populate(
    "user",
    "username email"
  );
  res.json(garbageRequests);
});

/**
 * @route   GET /api/garbage/my-requests
 * @desc    Get all garbage requests made by the logged-in user
 * @access  Private (Authenticated User)
 * @returns {Array} - A list of garbage collection requests made by the user
 */
const getUserGarbageRequests = asyncHandler(async (req, res) => {
  // Find garbage requests where the user ID matches the logged-in user
  const garbageRequests = await Garbage.find({ user: req.user._id }).populate(
    "user",
    "username email"
  );

  res.json(garbageRequests);
});

/**
 * @route   GET /api/garbage/:id
 * @desc    Get a single garbage collection request by ID
 * @access  Private
 * @returns {Object} - A single garbage request
 */
const getGarbageRequestById = asyncHandler(async (req, res) => {
  const garbage = await Garbage.findById(req.params.id).populate(
    "user",
    "username email"
  );

  if (garbage) {
    res.json(garbage);
  } else {
    res.status(404);
    throw new Error("Garbage request not found");
  }
});

/**
 * @route   PUT /api/garbage/:id
 * @desc    Update a garbage request status (Admin only)
 * @access  Private/Admin
 * @param   {String} status - The new status of the garbage collection request
 * @param   {Date} collectionDate - The date of garbage collection
 * @returns {Object} - The updated garbage request
 */
const updateGarbageRequest = asyncHandler(async (req, res) => {
  const { status, collectionDate } = req.body;

  const garbage = await Garbage.findById(req.params.id);

  if (garbage) {
    garbage.status = status || garbage.status;
    garbage.collectionDate = collectionDate || new Date(); // Set to current system date if not provided

    const updatedGarbage = await garbage.save();
    res.json(updatedGarbage);
  } else {
    res.status(404);
    throw new Error("Garbage request not found");
  }
});

/**
 * @route   DELETE /api/garbage/:id
 * @desc    Delete a garbage request (Admin only)
 * @access  Private/Admin
 * @returns {Object} - A JSON object confirming deletion
 */
const deleteGarbageRequest = asyncHandler(async (req, res) => {
  const garbage = await Garbage.findByIdAndDelete(req.params.id);

  if (garbage) {
    res.json({ message: "Garbage removed successfully!" });
  } else {
    res.status(404);
    throw new Error("Garbage not found!");
  }
});

export {
  createGarbageRequest,
  getAllGarbageRequests,
  getUserGarbageRequests,
  getGarbageRequestById,
  updateGarbageRequest,
  deleteGarbageRequest,
};
