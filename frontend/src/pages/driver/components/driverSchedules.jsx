import React, { useState, useEffect } from "react";
import { updateSchedule } from "../../../api/scheduleApi";

function DriverSchedules(props) {
  const [isLocationOn, setIsLocationOn] = useState(false);

  const [scheduleData, setScheduleData] = useState({
    _id: props.id || "",
    longitude: props.longitude || "",
    latitude: props.latitude || "",
    status: props.status || "",
  });

  useEffect(() => {
    const getLocation = () => {
      if (isLocationOn) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLatitude = position.coords.latitude;
            const newLongitude = position.coords.longitude;

            // Update the latitude and longitude in scheduleData
            setScheduleData((prevData) => {
              const updatedData = {
                ...prevData,
                latitude: newLatitude,
                longitude: newLongitude,
                status: "In-Progress",
              };

              // Call the updateLocation function after the state is updated
              updateLocation(updatedData);

              return updatedData;
            });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }
    };

    const intervalId = setInterval(getLocation, 5000);
    return () => clearInterval(intervalId);
  }, [isLocationOn]);

  const completeRoute = () => {
    setScheduleData((prevData) => {
      const updatedData = {
        ...prevData,
        status: "Completed",
      };

      updateLocation(updatedData);

      return updatedData;
    });
  };

  const updateLocation = async (updatedScheduleData) => {
    try {
      await updateSchedule(updatedScheduleData, props.id);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error updating schedule details:", error);
    }
  };

  return (
    <div>
      <div className="m-3 p-5 rounded-2xl bg-slate-200 shadow-xl">
        <div className="">
          <div className="flex justify-between h-[50%] items-center ">
            <h1 className="text-[20px] font-bold">
              {new Date(props.date).toLocaleDateString()}
            </h1>
            <h1 className="text-[20px] font-bold">{props.time}</h1>
          </div>
          <h1 className="text-[18px] font-bold text-[#2c7530]">
            {props.area} City
          </h1>
          <div className="flex justify-end">
            {props.status === "Pending" && (
              <button
                onClick={() => {
                  setIsLocationOn(true);
                  props.setTown(props.area);
                }}
                className="mt-2 px-5 py-2 text-sm bg-white hover:opacity-80 border-2 border-[#2c7530] text-[#2c7530] font-semibold rounded-lg"
              >
                Start Collection
              </button>
            )}
            {props.status === "In-Progress" && (
              <button
                onClick={completeRoute}
                className="mt-2 px-5 py-2 text-sm bg-[#2c7530] text-white rounded-lg"
              >
                Complete Route
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverSchedules;
