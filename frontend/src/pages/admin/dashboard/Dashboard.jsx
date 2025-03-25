import React from "react";
import ResponsiveDrawer from "../components/ResposiveDrawer";
import { useEffect, useState } from "react";
import { getAllGarbages } from "../../../api/garbageApi";
import AuthService from "../../../api/userApi";
import { getAllInquiries } from "../../../api/inquiryApi";
import { getAllTrucks } from "../../../api/truckApi";

// MUI Icons
import GroupIcon from "@mui/icons-material/Group";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Map from "../components/Map";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [garbageCount, setGarbageCount] = useState(0);
  const [truckCount, setTruckCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);

  const fetchAllUsers = async () => {
    try {
      const res = await AuthService.getAllUsers(); // Call the API to fetch users
      setUserCount(res.length); // Assuming res is an array of users
    } catch (error) {
      alert(error.message);
      console.error("Error fetching users: ", error.message);
    }
  };

  const fetchAllGarbages = async () => {
    try {
      const res = await getAllGarbages();
      setGarbageCount(res.length); // Assuming res is an array of garbages
    } catch (error) {
      alert(error.message);
      console.error("Error fetching garbages: ", error.message);
    }
  };

  const fetchAllTrucks = async () => {
    try {
      const res = await getAllTrucks();
      setTruckCount(res.length); // Assuming res is an array of trucks
    } catch (error) {
      alert(error.message);
      console.error("Error fetching trucks: ", error.message);
    }
  }; // Fetch all trucks

  const fetchAllInquiries = async () => {
    try {
      const res = await getAllInquiries(); // Call the API to fetch inquiries
      setInquiryCount(res.length); // Assuming res is an array of inquiries
    } catch (error) {
      alert(error.message);
      console.error("Error fetching inquiries: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllGarbages();
    fetchAllTrucks();
    fetchAllInquiries();
  }, []);

  return (
    <ResponsiveDrawer>
      <div className="w-full grid grid-cols-1 gap-6 px-5 my-8 sm:grid-cols-2 sm:px-8 h-[200px]">
        <div className="w-full flex items-center bg-white border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
          <div className="p-8 h-full bg-green-500 flex justify-center items-center">
            <GroupIcon style={{ fontSize: 50 }} className="text-white" />
          </div>
          <div className="px-5 text-gray-700 flex items-center justify-between w-full">
            <h3 className="text-sm font-semibold tracking-wider">
              Total Users
            </h3>
            <p className="text-5xl font-bold">{userCount}</p>
          </div>
        </div>
        <div className="w-full flex items-center bg-white border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
          <div className="p-8 h-full bg-blue-500 flex justify-center items-center">
            <DeleteSweepIcon style={{ fontSize: 50 }} className=" text-white" />
          </div>
          <div className="px-4 text-gray-700 flex items-start justify-between w-full">
            <h3 className="text-sm font-semibold tracking-wider">
              Total Garbage Requests
            </h3>
            <p className="text-5xl font-bold">{garbageCount}</p>
          </div>
        </div>
        <div className="w-full flex items-center bg-white border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
          <div className="p-8 h-full bg-indigo-500 flex justify-center items-center">
            <LocalShippingIcon
              style={{ fontSize: 50 }}
              className="text-white"
            />
          </div>
          <div className="px-5 text-gray-700 flex items-start justify-between w-full">
            <h3 className="text-sm font-semibold tracking-wider ">
              Total Trucks
            </h3>
            <p className="text-5xl font-bold">{truckCount}</p>
          </div>
        </div>
        <div className="w-full flex items-center bg-white border rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
          <div className="p-8 h-full bg-red-500 flex justify-center items-center">
            <SupportAgentIcon
              style={{ fontSize: 50 }}
              className=" text-white"
            />
          </div>
          <div className="px-5 text-gray-700 flex items-start justify-between w-full">
            <h3 className="text-sm font-semibold tracking-wider">
              Total Inquiries
            </h3>
            <p className="text-5xl font-bold">{inquiryCount}</p>
          </div>
        </div>
      </div>
      <div className="m-8 flex gap-y-3 flex-col">
        <span className="font-semibold text-xl">Live Garbage Requests</span>
        {/* <br /> */}
        <Map />
      </div>
    </ResponsiveDrawer>
  );
};

export default Dashboard;
