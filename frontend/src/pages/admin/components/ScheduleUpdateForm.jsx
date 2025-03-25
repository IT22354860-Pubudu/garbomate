import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; 
import EditIcon from "@mui/icons-material/Edit";
import { updateSchedule } from "../../../api/scheduleApi";
import { getAllTrucks } from '../../../api/truckApi';

export default function ScheduleUpdateForm({ schedule }) {
  const [isOpen, setIsOpen] = useState(false);

  const [scheduleData, setScheduleData] = useState({
    _id: schedule._id || "",
    truckId: schedule.truckId || "",
    area: schedule.area || "",
    time: schedule.time || "",
    date: schedule.date || "",
  });

  const [touched, setTouched] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [trucks, setTrucks] = useState([]);

    const fetchAllTrucks = async () => {
        try {
        const res= await getAllTrucks();
        setTrucks(res);
        } catch (error) {
        alert(error.message);
        console.error("Error fetching trucks: ", error.message);
        }
    };

    useEffect(() => {
        fetchAllTrucks();
    }, []);

//   const validatePhone = (mobile) => /^\d{10}$/.test(mobile);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setScheduleData({
      ...scheduleData,
      [name]: name === "availabilityStatus" ? value === "true" : value, // Convert string to boolean
        // [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedScheduleData = {
      ...scheduleData,
    //   availabilityStatus: truckData.availabilityStatus, // Ensure it's sent as boolean
    };

    try {
      await updateSchedule(updatedScheduleData, scheduleData._id);

      toast.success("Schedule details updated successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setIsSubmit(true);
      setTimeout(() => {
        setIsOpen(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating schedule details:", error);
      toast.error("Failed to update schedule details. Please try again.");
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
              Update schedule Details
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
                  {/* <input
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
                  /> */}
                  <select 
                    value={scheduleData.truckId}
                    name="truckId"
                    onBlur={() => handleBlur("truckId")}
                    onChange={handleChange}
                    className={`mt-1 p-3 w-full rounded-md border ${
                      !scheduleData.truckId && touched.truckId
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-blue-500 focus:ring focus:ring-blue-200`}>
                    {trucks.length > 0 ? (
                        trucks
                        .filter(truck => truck.availabilityStatus === true) 
                        .map((truck) => (
                            <option key={truck._id} value={truck._id}>{truck.truckNumber}</option> 
                        ))
                    ) : (
                        <option>No trucks available</option>
                    )}
                  </select>
                  {!scheduleData.truckId && touched.truckId && (
                    <p className="text-red-600 text-sm mt-1">* Required</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Area
                  </label>
                  <input
                    type="text"
                    value={scheduleData.area}
                    name="area"
                    onBlur={() => handleBlur("area")}
                    onChange={handleChange}
                    placeholder="Enter area"
                    className={`mt-1 p-3 w-full rounded-md border ${
                      !scheduleData.area && touched.area
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                  />
                  {!scheduleData.area && touched.area && (
                    <p className="text-red-600 text-sm mt-1">* Required</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-left block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input
                    type="text"
                    value={scheduleData.time}
                    name="time"
                    onBlur={() => handleBlur("time")}
                    onChange={handleChange}
                    placeholder="Enter Schedule Time"
                    className={`mt-1 p-3 w-full rounded-md border ${
                      !scheduleData.time && touched.time
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-green-500`}
                  />
                  {!scheduleData.time && touched.time && (
                    <p className="text-red-600 text-sm mt-1">* Required</p>
                  )}
                </div>

                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    value={scheduleData.date}
                    name="date"
                    onBlur={() => handleBlur("date")}
                    onChange={handleChange}
                    placeholder="Enter Schedule date"
                    className={`mt-1 p-3 w-full rounded-md border ${
                      touched.date && !scheduleData.date
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:border-green-500`}
                  />
                  {touched.date && !scheduleData.date &&(
                      <p className="text-red-600 text-sm mt-1">
                        * Required
                      </p>
                    )}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={
                    !scheduleData.truckId ||
                    !scheduleData.area ||                   
                    !scheduleData.date ||
                    !scheduleData.time 
                  }
                  className={`w-full py-3 px-4 font-semibold rounded-lg shadow-md text-white ${
                    !scheduleData.truckId ||
                    !scheduleData.area ||                   
                    !scheduleData.date ||
                    !scheduleData.time
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
