import API from "../helper/apiHelper";

// Function to create a new inquiry
const createInquiry = async (inquiry) => {
  try {
    const createdInquiry = await new API().post("inquiries", inquiry);
    return createdInquiry;
  } catch (error) {
    console.error("Error creating inquiry:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

// Function to retrieve all inquiries
const getAllInquiries = async () => {
  try {
    const inquiries = await new API().get("inquiries", {});
    return inquiries;
  } catch (error) {
    console.error("Error fetching inquiries:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const getUserAllInquiries = async () => {
  try {
    const inquiries = await new API().get("inquiries/inquiry-requests", {});
    // console.log("inquiriesINjs => ", inquiries);
    return inquiries;
  } catch (error) {
    console.error("Error fetching inquiries:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

// Function to delete an inquiry by ID
const deleteInquiry = async (id) => {
  try {
    const deletedInquiry = await new API().delete(`inquiries/${id}`);
    return deletedInquiry.data;
  } catch (error) {
    console.error("Error deleting inquiry:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

// Function to get a single inquiry by ID
const getInquiryById = async (id) => {
  try {
    const inquiry = await new API().get(`inquiries/${id}`);
    return inquiry;
  } catch (error) {
    console.error("Error fetching inquiry by ID:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

// Function to update an inquiry by ID
const updateInquiry = async (id, status) => {
  try {
    // Create the payload with only the status field
    const updatedData = { status };

    // Send a PUT request to update only the status of the inquiry
    // console.log(updatedData);
    const updatedInquiry = await new API().put(`inquiries/${id}`, updatedData);

    return updatedInquiry;
  } catch (error) {
    console.error("Error updating inquiry status:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export {
  createInquiry,
  getAllInquiries,
  getUserAllInquiries,
  deleteInquiry,
  getInquiryById,
  updateInquiry,
};
