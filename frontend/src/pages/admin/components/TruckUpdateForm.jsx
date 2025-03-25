import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "@mui/material";
import { updateTruck } from "../../../api/truckApi"; // Assuming this API function exists
import CloseIcon from "@mui/icons-material/Close"; // Assuming you have an API for truck creation
import EditIcon from "@mui/icons-material/Edit";

export default function TruckUpdateForm({ truck }) {
  const [isOpen, setIsOpen] = useState(false);

  const [truckData, setTruckData] = useState({
    _id: truck._id || "",
    truckNumber: truck.truckNumber || "",
    driverName: truck.driverName || "",
    driverNumber: truck.driverNumber || "",
    availabilityStatus: truck.availabilityStatus || false,
  });

  const [touched, setTouched] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (mobile) => /^\d{10}$/.test(mobile);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTruckData({
      ...truckData,
      [name]: name === "availabilityStatus" ? value === "true" : value, // Convert string to boolean
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedTruckData = {
      ...truckData,
      availabilityStatus: truckData.availabilityStatus, // Ensure it's sent as boolean
    };

    try {
      await updateTruck(updatedTruckData, truckData._id);

      toast.success("Truck details updated successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setIsSubmit(true);
      setTimeout(() => {
        setIsOpen(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating truck details:", error);
      toast.error("Failed to update truck details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <div>
      <div>
        <EditIcon className="cursor-pointer" onClick={() => setIsOpen(true)} />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-2xl bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl mb-5 font-bold text-center text-gray-800">
              Update Truck Details
            </h1>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
            <Divider className="mb-6" />
            <br />
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols- gap-6">
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    Truck Number
                  </label>
                  <input
                    type="text"
                    value={truckData.truckNumber}
                    name="truckNumber"
                    onBlur={() => handleBlur("truckNumber")}
                    onChange={handleChange}
                    placeholder="Enter truck number"
                    className={`mt-1 p-3 w-full rounded-md border ${
                      !truckData.truckNumber && touched.truckNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-green-500`}
                  />
                  {!truckData.truckNumber && touched.truckNumber && (
                    <p className="text-red-600 text-sm mt-1">* Required</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Availability Status
                  </label>
                  <select
                    value={truckData.availabilityStatus}
                    name="availabilityStatus"
                    onChange={handleChange}
                    className="mt-1 p-3 w-full rounded-md border border-gray-300"
                  >
                    <option value={true}>Available</option>
                    <option value={false}>Unavailable</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-left block text-sm font-medium text-gray-700">
                    Driver Name
                  </label>
                  <input
                    type="text"
                    value={truckData.driverName}
                    name="driverName"
                    onBlur={() => handleBlur("driverName")}
                    onChange={handleChange}
                    placeholder="Enter driver's name"
                    className={`mt-1 p-3 w-full rounded-md border ${
                      !truckData.driverName && touched.driverName
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-green-500`}
                  />
                  {!truckData.driverName && touched.driverName && (
                    <p className="text-red-600 text-sm mt-1">* Required</p>
                  )}
                </div>

                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    Driver Contact Number
                  </label>
                  <input
                    type="number"
                    value={truckData.driverNumber}
                    name="driverNumber"
                    onBlur={() => handleBlur("driverNumber")}
                    onChange={handleChange}
                    placeholder="Enter driver's mobile number"
                    className={`mt-1 p-3 w-full rounded-md border ${
                      touched.driverNumber &&
                      (!truckData.driverNumber ||
                        !validatePhone(truckData.driverNumber))
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-green-500`}
                  />
                  {touched.driverNumber &&
                    (!truckData.driverNumber ||
                      !validatePhone(truckData.driverNumber)) && (
                      <p className="text-red-600 text-sm mt-1">
                        * Invalid phone number. Must be 10 digits.
                      </p>
                    )}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={
                    !truckData.truckNumber ||
                    !truckData.driverName ||
                    !truckData.driverNumber ||
                    !validatePhone(truckData.driverNumber)
                  }
                  className={`w-full py-3 px-4 font-semibold rounded-lg shadow-md text-white ${
                    !truckData.truckNumber ||
                    !truckData.driverName ||
                    !truckData.driverNumber ||
                    !validatePhone(truckData.driverNumber)
                      ? "bg-gray-300"
                      : "bg-green-700 hover:bg-green-600"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  {isLoading ? "Updating..." : "Update Truck Details"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
