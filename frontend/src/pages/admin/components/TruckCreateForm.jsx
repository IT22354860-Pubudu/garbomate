import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "@mui/material";
import { createTruck } from "../../../api/truckApi";
import CloseIcon from "@mui/icons-material/Close"; // Assuming you have an API for truck creation

export default function TruckCreateForm() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  // Initialize state for all form fields in one object
  const [truckEntryData, setTruckEntryData] = useState({
    truckNumber: "",
    driverName: "",
    driverNumber: "",
  });

  // Destructure state variables
  const { truckNumber, driverName, driverNumber } = truckEntryData;

  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Phone number validation function
  const validatePhone = (mobile) => {
    return /^\d{10}$/.test(mobile); // Validates if the phone number has exactly 10 digits
  };

  const handleChange = (e) => {
    setTruckEntryData({
      ...truckEntryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newTruckEntry = {
      truckNumber,
      driverName,
      driverNumber,
    };

    try {
      // console.log(`newTruckEntry => `, newTruckEntry);
      await createTruck(newTruckEntry);

      toast.success("Your truck entry has been submitted successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        setIsOpen(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error submitting truck entry:", error);
      toast.error("Failed to submit truck entry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-[#48752c] text-white rounded-md shadow-md hover:bg-[#2c471b] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Open Truck Entry Form
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-2xl bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl mb-5 font-bold text-center text-gray-800">
              Truck Details Entry
            </h1>
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
            <Divider className="mb-6" />
            <br />
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Truck Number
                  </label>
                  <input
                    type="text"
                    value={truckNumber}
                    name="truckNumber"
                    onBlur={() => handleBlur("truckNumber")}
                    onChange={handleChange}
                    placeholder="Enter truck number"
                    className={`mt-1 p-3 w-full rounded-md border ${
                      !truckNumber && touched.truckNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                  />
                  {!truckNumber && touched.truckNumber && (
                    <p className="text-red-600 text-sm mt-1">* Required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Driver Name
                  </label>
                  <input
                    type="text"
                    value={driverName}
                    name="driverName"
                    onBlur={() => handleBlur("driverName")}
                    onChange={handleChange}
                    placeholder="Enter driver name"
                    className={`mt-1 p-3 w-full rounded-md border ${
                      !driverName && touched.driverName
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                  />
                  {!driverName && touched.driverName && (
                    <p className="text-red-600 text-sm mt-1">* Required</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Driver Contact Number
                </label>
                <input
                  type="number"
                  value={driverNumber}
                  name="driverNumber"
                  onBlur={() => handleBlur("driverNumber")}
                  onChange={handleChange}
                  placeholder="Enter driver contact number"
                  className={`mt-1 p-3 w-full rounded-md border ${
                    touched.driverNumber &&
                    (!driverNumber || !validatePhone(driverNumber))
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                />
                {touched.driverNumber &&
                  (!driverNumber || !validatePhone(driverNumber)) && (
                    <p className="text-red-600 text-sm mt-1">
                      * Invalid phone number. Must be 10 digits.
                    </p>
                  )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={
                    !truckNumber ||
                    !driverName ||
                    !driverNumber ||
                    !validatePhone(driverNumber)
                  }
                  className={`w-full py-3 px-4 font-semibold rounded-lg shadow-md text-white ${
                    !truckNumber ||
                    !driverName ||
                    !driverNumber ||
                    !validatePhone(driverNumber)
                      ? "bg-gray-300"
                      : "bg-[#48752c] hover:bg-[#2c471b]"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                >
                  {isLoading ? "Adding..." : "Submit Truck Details"}
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
