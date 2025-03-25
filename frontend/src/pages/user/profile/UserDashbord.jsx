import React, { useState, useEffect } from "react";
import UserDrawer from "../components/UserDrawer";
import AuthService from "../../../api/userApi";
import { getUserAllGarbages } from "../../../api/garbageApi";
import { getUserAllInquiries } from "../../../api/inquiryApi";

// MUI Icons
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ScoreIcon from "@mui/icons-material/Score";

const UserDashbord = () => {
  const [garbageCount, setGarbageCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [ecoscore, setEcoscore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Track Your Garbage Pickup",
      description:
        "Users can track the real-time location of garbage trucks, ensuring they are aware of when to expect the next collection.",
    },
    {
      title: "Organized Waste Collection",
      description:
        "The system helps manage different types of waste (organic, plastic, glass, etc.) with clear schedules and designated days for each.",
    },
    {
      title: "Earn Eco Points for Sustainable Actions",
      description:
        "Every time you dispose of waste properly or recycle items, you earn eco-score points, which can be redeemed for rewards.",
    },
    {
      title: "Stay Updated on Your Inquiries",
      description:
        "Users can submit inquiries or issues related to garbage collection, billing, or service disruptions and receive real-time SMS status updates.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const fetchProfile = async () => {
    try {
      const userProfile = await AuthService.getCurrentUserDetails();
      setEcoscore(userProfile.ecoscore);
    } catch (err) {
      console.error("Error fetching profile: ", err.message);
    }
  };

  const fetchAllGarbages = async () => {
    try {
      const res = await getUserAllGarbages();
      setGarbageCount(res.length);
    } catch (error) {
      console.error("Error fetching garbages: ", error.message);
    }
  };

  const fetchAllInquiries = async () => {
    try {
      const res = await getUserAllInquiries();
      setInquiryCount(res.length);
    } catch (error) {
      console.error("Error fetching inquiries: ", error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchAllGarbages();
    fetchAllInquiries();
  }, []);

  return (
    <UserDrawer>
      <div className="p-5 h-screen overflow-hidden">
        {/* Sliding div */}
        <div className="relative h-[40%] p-5 text-center bg-[#436d29]  shadow-xl mb-8 transition-all duration-1000">
          <div className="w-full h-full p-2  flex flex-col justify-center items-center">
            <h1 className="text-[28px] text-[#f9da78] font-bold">
              {slides[currentIndex].title}
            </h1>
            <h1 className="text-[18px] text-white">
              {slides[currentIndex].description}
            </h1>
          </div>

          {/* Dots navigation */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-[#f9da78]" : "bg-[#ccc]"
                }`}
              ></span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-white">
            <div
              className="h-full bg-[#f9da78] transition-all"
              style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Static content */}
        <main className="h-full overflow-y-auto">
          <div className="container mx-auto grid">
            <div className="grid gap-6 mb-8 md:grid-cols-3">
              <div className="shadow-xl flex items-center p-4 bg-white rounded-lg shadow-xs :bg-gray-800">
                <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full :text-teal-100 :bg-teal-500">
                  <ScoreIcon />
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="mb-2 text-sm font-medium text-gray-600 :text-gray-400">
                    My Eco Score
                  </p>
                  <p className="text-[50px] font-semibold text-gray-700 :text-gray-200">
                    {ecoscore}
                  </p>
                </div>
              </div>

              <div className="shadow-xl flex items-center px-4 py-10 bg-white rounded-lg shadow-xs :bg-gray-800">
                <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full :text-orange-100 :bg-orange-500">
                  <SupportAgentIcon />
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="mb-2 text-sm font-medium text-gray-600 :text-gray-400">
                    My Inquiries
                  </p>
                  <p className="text-[50px] font-semibold text-gray-700 :text-gray-200">
                    {inquiryCount}
                  </p>
                </div>
              </div>

              <div className="shadow-xl flex items-center p-4 bg-white rounded-lg shadow-xs :bg-gray-800">
                <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full :text-green-100 :bg-green-500">
                  <DeleteSweepIcon />
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="mb-2 text-sm font-medium text-gray-600 :text-gray-400">
                    My Garbage Requests
                  </p>
                  <p className="text-[50px] font-semibold text-gray-700 :text-gray-200">
                    {garbageCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </UserDrawer>
  );
};

export default UserDashbord;
