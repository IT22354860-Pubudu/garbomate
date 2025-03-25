import Schedule from "../models/scheduleModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * @route   POST /api/schedule
 * @desc    Create a new schedule request
 * @access  Private
 * @param   {Object} truckId - The id of the truck (required)
 * @param   {String} area - The area of the collection (required)
 * @param   {String} time - the time of schedule (required)
 * @param   {String} date - the date of schedule (required)
 * @returns {Object} - A JSON object containing the newly created schedule data
 */
const createSchedule = asyncHandler(async (req, res) => {
  const { truckId, area, time, date } = req.body;

  if (!truckId || !area || !time || !date ) {
    res.status(400);
    throw new Error("Please fill all required fields.");
  }

  const schedule = new Schedule({
    truckId,
    area,
    time,
    date,
    longitude: null,
    latitude: null,
    status: 'Pending'
  });

  const createdSchedule = await schedule.save();
  res.status(201).json(createdSchedule);
});

/**
 * @route   GET /api/schedule
 * @desc    Get all schedule requests (Admin only)
 * @access  Private/Admin
 * @returns {Array} - A list of all schedules
 */
const getAllSchedules = asyncHandler(async (req, res) => {
  const schedules = await Schedule.find({})
  res.json(schedules);
});

/**
 * @route   GET /api/schedules/my-schedules
 * @desc    Get all schedules assingd to the truck
 * @access  Private (Authenticated Truck)
 * @returns {Array} - A list of schedules assingd to the truck
 */
const getTruckSchedules = asyncHandler(async (req, res) => {
  const schedule = await Schedule.find({ truckId: req.params.id })

  res.json(schedule);
});

/**
 * @route   GET /api/schedule/:id
 * @desc    Get a single schedule by ID
 * @access  Private
 * @returns {Object} - A single schedule
 */
const getScheduleById = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.id)
  if (schedule) {
    res.json(schedule);
  } else {
    res.status(404);
    throw new Error("Schedule request not found");
  }
});

/**
 * @route   PUT /api/schedule/:id
 * @desc    Update a schedule status (Admin only)
 * @access  Private/Admin
 * @param   {Object} truckId - The id of the truck (required)
 * @param   {String} area - The area of the collection (required)
 * @param   {String} time - the time of schedule (required)
 * @param   {String} date - the date of schedule (required)
 * @returns {Object} - The updated garbage request
 */
const updateSchedule = asyncHandler(async (req, res) => {
  const { truckId, area, time, date, longitude, latitude, status} = req.body;

  const schedule = await Schedule.findById(req.params.id);

  if (schedule) {
    schedule.truckId = truckId || schedule.truckId;
    schedule.area = area || schedule.area;
    schedule.time = time || schedule.time;
    schedule.date = date || schedule.date;
    schedule.longitude = longitude || schedule.longitude;
    schedule.latitude = latitude || schedule.latitude;
    schedule.status = status || schedule.status;
    // schedule.collectionDate = collectionDate || new Date(); // Set to current system date if not provided

    const updatedSchedule = await schedule.save();
    res.json(updatedSchedule);
  } else {
    res.status(404);
    throw new Error("Schedule request not found");
  }
});

/**
 * @route   DELETE /api/schedule/:id
 * @desc    Delete a schedule (Admin only)
 * @access  Private/Admin
 * @returns {Object} - A JSON object confirming deletion
 */
const deleteSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findByIdAndDelete(req.params.id);

  if (schedule) {
    res.json({ message: "Schedule removed successfully!" });
  } else {
    res.status(404);
    throw new Error("Schedule not found!");
  }
});

export {
  createSchedule,
  getAllSchedules,
  getTruckSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
