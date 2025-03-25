import React, { useState, useEffect } from "react";
import logo from "../../../assets/GarboMate.png";
import schedules from "../../../assets/icons/schedules.png";
import map from "../../../assets/icons/map.png";

import SchedulesComponent from "../components/driverSchedules";
import MapComponent from "../components/driverMap";
import { getTruckSchedules } from "../../../api/scheduleApi";

function DriverDashboard() {
  const [truckId, setTruckId] = useState(null);
  const [isSchedules, setIsSchedules] = useState(true);
  const [isMap, setIsMap] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const [town, setTown] = useState("");

  useEffect(() => {
    setTruckId("66fe7f295fbf74a1f3b588b3");
  }, []);

  useEffect(() => {
    const fetchAllSchedulesForTruck = async () => {
      try {
        if (truckId) {
          const res = await getTruckSchedules(truckId);
          setTrucks(res);
        }
      } catch (error) {
        alert(error.message);
        console.error("Error fetching trucks: ", error.message);
      }
    };

    fetchAllSchedulesForTruck();
  }, [truckId]);

  const handleSchedulesClick = () => {
    setIsSchedules(true);
    setIsMap(false);
  };

  const handleMapClick = () => {
    setIsSchedules(false);
    setIsMap(true);
  };

  return (
    <div className="h-dvh flex flex-col">
      {/* header */}
      <div className="bg-gray-200 pt-5 pb-5 rounded-b-3xl">
        <div className="flex justify-center">
          <img src={logo} className=" w-[150px]" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-[14px] font-bold">
            GarboMate Waste Management System
          </h1>
        </div>
      </div>

      {/* body */}
      <div className=" flex-grow">
        <div className=" flex justify-center "></div>
        <div className="">
          {isSchedules && (
            <div>
              <h1 className=" w-full pl-4 text-left text-[20px] font-bold text-[#48752c] mt-3">
                Driver Dashboard
              </h1>
              {trucks.map((schedule) => {
                if (schedule.status != "Completed") {
                  return (
                    <SchedulesComponent
                      key={schedule._id}
                      date={schedule.date}
                      time={schedule.time}
                      area={schedule.area}
                      id={schedule._id}
                      status={schedule.status}
                      setTown={setTown}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
          {isMap && <MapComponent town={town} />}
        </div>
      </div>
      {/* footer */}
      <div className="bg-gray-200 w-full flex justify-around font-bold text-[16px] rounded-t-3xl absolute bottom-0">
        <div
          onClick={handleSchedulesClick}
          className={`flex flex-col justify-center rounded-tl-3xl items-center w-[50%] p-3 ${
            isSchedules ? "bg-[#2c7530]" : ""
          }`}
        >
          <img src={schedules} className="w-[25px]" />
          <h1 className=" text-sm">Shedules</h1>
        </div>
        <div
          onClick={handleMapClick}
          className={`flex flex-col justify-center rounded-tr-3xl items-center w-[50%] p-3 ${
            isMap ? "bg-[#2c7530]" : ""
          }`}
        >
          <img src={map} className="w-[20px]" />
          <h1 className=" text-sm">Map</h1>
        </div>
      </div>
    </div>
  );
}

export default DriverDashboard;
