import API from "../helper/apiHelper";

const createSchedule = async (schedule) => {
  try {
    const createdSchedule = await new API().post("schedule", schedule);
    return createdSchedule;
  } catch (error) {
    console.error("Error creating schedule:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
}; // Create a new Schedule

const getTruckSchedules = async (id) => {
  // Get all trucks
  try {
    const schedules = await new API().get(`schedule/truck-schedules/${id}`, {});
    return schedules;
  } catch (error) {
    console.error("Error fetching Schedules:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
}; // Get all Schedule

const getAllSchedules = async () => {
  // Get all trucks
  try {
    const schedules = await new API().get("schedule", {});
    return schedules;
  } catch (error) {
    console.error("Error fetching Schedules:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
}; // Get all Schedule

const updateSchedule = async (data, id) => {
  try {
    const updatedSchedule = await new API().put(`schedule/${id}`, data); // Sending 'data' directly
    // console.log(updatedSchedule);
    return updatedSchedule;
  } catch (error) {
    console.error("Error updating Schedule:", error.message);
    throw error;
  }
}; // Update a Schedule

const deleteSchedule = async (id) => {
  // Delete a truck
  try {
    const deletedSchedule = await new API().delete(`schedule/${id}`);
    // console.log("deletedSchedule => ", deletedSchedule);
    return deletedSchedule.data;
  } catch (error) {
    console.error("Error deleting Schedule:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
}; // Delete a Schedule

export { createSchedule, getAllSchedules, updateSchedule, deleteSchedule, getTruckSchedules};
// Export the functions for use in the frontend
