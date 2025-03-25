import API from "../helper/apiHelper";

const createTruck = async (truck) => {
  try {
    const createdTruck = await new API().post("truck", truck);
    return createdTruck;
  } catch (error) {
    console.error("Error creating truck:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
}; // Create a new truck

const getAllTrucks = async () => {
  // Get all trucks
  try {
    const trucks = await new API().get("truck", {});
    return trucks;
  } catch (error) {
    console.error("Error fetching trucks:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
}; // Get all trucks

const updateTruck = async (data, id) => {
  try {
    const updatedTruck = await new API().put(`truck/${id}`, data); // Sending 'data' directly
    // console.log(updatedTruck);
    return updatedTruck;
  } catch (error) {
    console.error("Error updating truck:", error.message);
    throw error;
  }
}; // Update a truck

const deleteTruck = async (id) => {
  // Delete a truck
  try {
    const deletedTruck = await new API().delete(`truck/${id}`);
    // console.log("deletedTruck => ", deletedTruck);
    return deletedTruck.data;
  } catch (error) {
    console.error("Error deleting truck:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
}; // Delete a truck

const getTruckDetails = async ({ truckNumber, driverName }) => {
  try {
    // Send truckNumber and driverName as part of the request body
    const truckDetails = await new API().post(`truck/`, {
      truckNumber,
      driverName,
    });
    return truckDetails;
  } catch (error) {
    console.error("Error fetching truck details:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
}; // Get truck details by truck number and driver name

export { createTruck, getAllTrucks, updateTruck, deleteTruck, getTruckDetails };

// Export the functions for use in the frontend
