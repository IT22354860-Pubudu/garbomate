import Inquiry from "../models/inquiryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * @route   POST /api/inquiries
 * @desc    Create a new inquiry
 * @access  Public
 * @param   {Object} inquiryData - The data of the inquiry (required)
 * @returns {Object} - A JSON object containing the newly created inquiry data
 */
const createInquiry = asyncHandler(async (req, res) => {
  const { email, phone, title, description, inquiryType } = req.body;

  // Validate required fields
  if (!email || !phone || !title || !description || !inquiryType) {
    res.status(400);
    throw new Error("Please fill all required fields!");
  }

  // Create a new inquiry
  const inquiry = new Inquiry({
    user: req.user._id, // If user is authenticated, assign user ID
    email,
    phone,
    title,
    description,
    inquiryType,
  });

  const savedInquiry = await inquiry.save();
  res.status(201).json(savedInquiry);
});

/**
 * @route   GET /api/inquiries
 * @desc    Retrieve all inquiries
 * @access  Private
 * @returns {Array} - A JSON array containing all inquiries
 */
const getAllInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find({}).populate("user", "username email");
  res.json(inquiries);
});

/**
 * @route   GET /api/inquiries/:id
 * @desc    Retrieve a single inquiry by ID
 * @access  Private
 * @param   {String} id - The ID of the inquiry to retrieve
 * @returns {Object} - A JSON object containing the inquiry data
 */
const getInquiryById = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id).populate(
    "user",
    "username email"
  );

  if (inquiry) {
    res.json(inquiry);
  } else {
    res.status(404);
    throw new Error("Inquiry not found!");
  }
});

/**
 * @route   GET /api/garbage/my-requests
 * @desc    Get all garbage requests made by the logged-in user
 * @access  Private (Authenticated User)
 * @returns {Array} - A list of garbage collection requests made by the user
 */
const getUserInquiryRequests = asyncHandler(async (req, res) => {
  // Find garbage requests where the user ID matches the logged-in user
  const inquiryRequests = await Inquiry.find({ user: req.user._id }).populate(
    "user",
    "username email"
  );

  res.json(inquiryRequests);
});

/**
 * @route   PUT /api/inquiries/:id
 * @desc    Update an inquiry by ID
 * @access  Private
 * @param   {String} id - The ID of the inquiry to update
 * @body    {Object} inquiryData - The updated inquiry data
 * @returns {Object} - A JSON object containing the updated inquiry data
 */
const updateInquiryStatusById = asyncHandler(async (req, res) => {
  const { status } = req.body; // Extract only the status from the request body
  const inquiry = await Inquiry.findById(req.params.id).populate(
    "user",
    "username email phone"
  ); // Find the inquiry by ID and populate user details

  if (inquiry) {
    // Update only the status field
    inquiry.status = status;

    // Save the updated inquiry
    const updatedInquiry = await inquiry.save();

    // Generate a dynamic message based on the inquiry status
    const inquiryStatus = updatedInquiry.status;
    const title = updatedInquiry.title;
    const user = updatedInquiry.user;
    const message = `Subject: Garbage Inquiry Status Update\n\nDear ${user.username},\n\nYour garbage inquiry titled "${title}" has been updated to ${inquiryStatus}. Thank you for your patience. If you have any questions or need further assistance, please contact us at 032 22 65638.\n\nBest Regards,\nGarboMate Support Team`;

    // Format the phone number before sending a message
    const formattedPhone = formatPhoneNumber(inquiry.phone);

    // Send a confirmation message to the user's phone
    await sendMessage(formattedPhone, message);

    res.json(updatedInquiry);
  } else {
    res.status(404);
    throw new Error("Inquiry not found!");
  }
});

/**
 * @route   DELETE /api/inquiries/:id
 * @desc    Delete an inquiry by ID
 * @access  Private
 * @param   {String} id - The ID of the inquiry to delete
 * @returns {Object} - A JSON object confirming deletion
 */
const deleteInquiryById = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (inquiry) {
    await Inquiry.deleteOne({ _id: inquiry._id });
    res.json({ message: "Inquiry removed!" });
  } else {
    res.status(404);
    throw new Error("Inquiry not found!");
  }
});

export {
  createInquiry,
  getAllInquiries,
  getUserInquiryRequests,
  getInquiryById,
  updateInquiryStatusById,
  deleteInquiryById,
};

function formatPhoneNumber(phoneNumber) {
  if (phoneNumber.startsWith("0")) {
    phoneNumber = "94" + phoneNumber.substring(1);
  }
  return phoneNumber;
}

// Function to send a message using the notify.lk API
async function sendMessage(to, message) {
  const apiUrl = "https://app.notify.lk/api/v1/send";
  const userId = "28055"; // Replace with your user ID
  const apiKey = "O3nZtNxq9SRz0w8Xhrpk"; // Replace with your API key
  const senderId = "NotifyDEMO"; // Replace with your sender ID

  const data = {
    user_id: userId,
    api_key: apiKey,
    sender_id: senderId,
    to: to,
    message: message,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json(); // Assuming the API responds with JSON
    // console.log("Success:", responseData);
  } catch (error) {
    console.error("Error:", error);
  }
}
