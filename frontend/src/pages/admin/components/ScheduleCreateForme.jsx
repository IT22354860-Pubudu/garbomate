import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "@mui/material";
import { createSchedule } from "../../../api/scheduleApi";
import { getAllTrucks } from "../../../api/truckApi";
import CloseIcon from "@mui/icons-material/Close"; // Assuming you have an API for truck creation

export default function ScheduleCreateForm() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  // Initialize state for all form fields in one object
  const [scheduleEntryData, setScheduleEntryData] = useState({
    truckId: "",
    area: "",
    time: "",
    date: "",
  });

  // Destructure state variables
  const { truckId, area, time, date } = scheduleEntryData;

  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [trucks, setTrucks] = useState([]);

  // Phone number validation function
  //   const validatePhone = (mobile) => {
  //     return /^\d{10}$/.test(mobile); // Validates if the phone number has exactly 10 digits
  //   };

  const fetchAllTrucks = async () => {
    try {
      const res = await getAllTrucks();
      setTrucks(res);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching trucks: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllTrucks();
  }, []);

  const handleChange = (e) => {
    setScheduleEntryData({
      ...scheduleEntryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newScheduleEntry = {
      truckId,
      area,
      time,
      date,
    };

    try {
      // console.log(`newScheduleEntry => `, newScheduleEntry);
      await createSchedule(newScheduleEntry);

      toast.success("Your schedule entry has been submitted successfully!", {
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
      console.error("Error submitting schedule entry:", error);
      toast.error("Failed to submit schedule entry. Please try again.");
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
        Open Schedule Entry Form
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-2xl bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl mb-5 font-bold text-center text-gray-800">
              Schedule Details Entry
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
                  <select
                    value={truckId}
                    name="truckId"
                    onBlur={() => handleBlur("truckId")}
                    onChange={handleChange}
                    className={`mt-1 p-3 w-full rounded-md border ${
                      !truckId && touched.truckId
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                  >
                    {trucks.length > 0 ? (
                      trucks
                        .filter((truck) => truck.availabilityStatus === true)
                        .map((truck) => (
                          <option key={truck._id} value={truck._id}>
                            {truck.truckNumber}
                          </option>
                        ))
                    ) : (
                      <option>No trucks available</option>
                    )}
                  </select>
                  {/* <input
                    type="text"
                    value={truckId}
                    name="truckId"
                    onBlur={() => handleBlur("truckId")}
                    onChange={handleChange}
                    placeholder="Enter truck number"
                    className={`mt-1 p-3 w-full rounded-md border ${
                      !truckId && touched.truckId
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                  />
                  {!truckId && touched.truckId && (
                    <p className="text-red-600 text-sm mt-1">* Required</p>
                  )}*/}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Area
                  </label>
                  <input
                    type="text"
                    value={area}
                    name="area"
                    onBlur={() => handleBlur("area")}
                    onChange={handleChange}
                    placeholder="Enter area"
                    className={`mt-1 p-3 w-full rounded-md border ${
                      !area && touched.area
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                  />
                  {!area && touched.area && (
                    <p className="text-red-600 text-sm mt-1">* Required</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="text"
                  value={time}
                  name="time"
                  onBlur={() => handleBlur("time")}
                  onChange={handleChange}
                  placeholder="Enter driver contact number"
                  className={`mt-1 p-3 w-full rounded-md border ${
                    touched.time && !time ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                />
                {touched.time && !time && (
                  <p className="text-red-600 text-sm mt-1">* Required</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  name="date"
                  onBlur={() => handleBlur("date")}
                  onChange={handleChange}
                  placeholder="Enter date"
                  className={`mt-1 p-3 w-full rounded-md border ${
                    touched.date && !date ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                />
                {touched.date && !date && (
                  <p className="text-red-600 text-sm mt-1">* Required</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!truckId || !time || !date || !area}
                  className={`w-full py-3 px-4 font-semibold rounded-lg shadow-md text-white ${
                    !truckId || !time || !date || !area
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
