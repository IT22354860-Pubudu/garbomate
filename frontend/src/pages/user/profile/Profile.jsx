import React, { useState, useEffect } from "react";
import AuthService from "../../../api/userApi";
import UserDrawer from "../components/UserDrawer";
import { ToastContainer, toast } from "react-toastify";

import user from "../../../assets/user.png";
import email from "../../../assets/icons/email.png";
import phone from "../../../assets/icons/phone.png";
import address from "../../../assets/icons/location.png";
import dropdown from "../../../assets/icons/dropdown.png";
import editprofile from "../../../assets/icons/editprofile.png";

import Off40 from "../../../assets/vouchers/40off.png";
import Off50 from "../../../assets/vouchers/50off.png";
import Off60 from "../../../assets/vouchers/60off.png";
import Off70 from "../../../assets/vouchers/70off.png";
import { Navigate, useNavigate } from "react-router";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const [imageSelected, setImageSelected] = useState("");

  const [isToggleDropdownforInformation, setToggleDropdownforInformation] =
    useState(false);
  const [updateProfile, setUpdateProfile] = useState({
    username: "",
    email: "",
    gender: "",
    contact: "",
    address: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await AuthService.getCurrentUserDetails();
        setProfile(userProfile);
        setUpdateProfile({
          username: userProfile.username || "",
          email: userProfile.email || "",
          gender: userProfile.gender || "",
          contact: userProfile.contact || "",
          address: userProfile.address || "",
          profileImage: userProfile.profileImage || "",
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateProfile((prev) => {
      console.log("Updating:", name, value);
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const toggleDropdownforInformation = () => {
    setToggleDropdownforInformation(!isToggleDropdownforInformation);
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", imageSelected);
    data.append("upload_preset", "GarboMateUser_Preset");
    data.append("cloud_name", "dg8cpnx1m");

    console.log("reached uploadimage");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dg8cpnx1m/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    console.log("completed uploadimage");
    const imageUrl = await res.json();
    return imageUrl.url;
  };

  const handleUpdate = async () => {
    console.log("Profile to update:", updateProfile);
    setIsLoading(true);

    try {
      let profileImageUrl = updateProfile.profileImage;

      if (imageSelected) {
        profileImageUrl = await uploadImage();
      }

      const updatedProfileData = {
        ...updateProfile,
        profileImage: profileImageUrl || updateProfile.profileImage, // Keep old image if no new image is uploaded
      };

      const response = await AuthService.updateUser(updatedProfileData);
      toast.success("Your Profile Updated successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setToggleDropdownforInformation(false);

      setProfile((prevProfile) => ({
        ...prevProfile,
        ...updatedProfileData,
      }));

      setIsLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
      setIsLoading(false);
    }
  };

  const handleCollect = async (threshold) => {
    try {
      // Parse the ecoscore as a number
      let currentEcoscore = parseInt(profile.ecoscore, 10);

      // Check if the ecoscore is above the threshold to allow collection
      if (currentEcoscore >= threshold) {
        currentEcoscore -= threshold;

        // Prepare the updated profile with the new ecoscore
        const updatedProfileData = {
          ...profile,
          ecoscore: currentEcoscore.toString(), // Update ecoscore
        };

        // Send a request to the backend to update the profile with the new ecoscore
        await AuthService.updateUser(updatedProfileData);

        // Update the local state to reflect the new ecoscore
        setProfile((prevProfile) => ({
          ...prevProfile,
          ecoscore: updatedProfileData.ecoscore,
        }));

        // Notify the user that the voucher was successfully collected
        toast.success("Voucher collected!", {
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
          window.location.reload();
          // nav("/user/profile");
        }, 2000);
        // console.log(
        //   "Ecoscore successfully updated:",
        //   updatedProfileData.ecoscore
        // );
      } else {
        console.log("Not enough ECO points to collect this voucher.");
        toast.error("Not enough ECO points to collect this voucher.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error updating ecoscore:", error);
      toast.error("Failed to collect voucher. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <UserDrawer>
      <div className="flex flex-col items-center justify-center ">
        <div className=" w-full rounded border-[3px]  p-5 ">
          <div className=" flex justify-around ">
            <div className="flex justify-center w-full">
              <div className=" my-5 justify-center flex mx-5 ">
                <img
                  src={profile?.profileImage || user}
                  alt="Profile Picture"
                  className="w-[120px] h-[120px] rounded-full"
                />
              </div>

              <div className="justify-center flex">
                <div className=" flex flex-col justify-center space-y-3">
                  <div className=" text-[24px] font-bold text-[#48752c]">
                    <span>{profile.username}</span>
                  </div>
                  <div className="">
                    <img
                      src={address}
                      alt="Logo"
                      className="mx-auto w-[20px] h-[20px] mr-4  inline-block"
                    />
                    <span>{profile.address}</span>
                  </div>
                  <div className="">
                    <img
                      src={email}
                      alt="Logo"
                      className="mx-auto w-[20px] h-[20px] mr-4  inline-block"
                    />
                    <span>{profile.email}</span>
                  </div>
                  <div className="">
                    <img
                      src={phone}
                      alt="Logo"
                      className="mx-auto w-[20px] h-[20px] mr-4 inline-block"
                    />
                    <span>{profile.contact}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col items-end justify-end w-[30%]">
              <div
                onClick={toggleDropdownforInformation}
                className="absolute top-0 right-0 bg-gray-300 hover:bg-[#f9da78] w-[50px] shadow-xl h-[50px] flex items-center justify-center rounded-full mb-2"
              >
                <img
                  src={editprofile}
                  alt="edit"
                  className="mx-auto w-[25px] h-[25px] inline-block"
                />
              </div>
              <div className="items-center justify-center px-5 flex flex-col bg-[#48752c] text-center rounded-3xl shadow-lg p-2">
                <h1 className="text-[28px] font-bold text-[#f9da78]">
                  {profile.ecoscore}
                </h1>
                <h1 className="text-[16px] text-white">Eco Score Points</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full py-5 flex items-start">
          <div className=" w-[100%] h-auto rounded border-[3px] p-3 mr-2 border-[#48752c]">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-[21px] my-1">
                Update Personal Information
              </h1>
              <img
                src={dropdown}
                alt="dropdown"
                className={`w-[20px] h-[20px] cursor-pointer transition-transform duration-300 ${
                  isToggleDropdownforInformation ? "rotate-180" : "rotate-0"
                }`}
                onClick={toggleDropdownforInformation}
              />
            </div>
            {isToggleDropdownforInformation && (
              <div className="m-4">
                <div className="flex flex-col justify-around space-y-2 ">
                  <h1 className="font-bold">Name: </h1>
                  <input
                    type="text"
                    name="username"
                    value={updateProfile.username}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="py-2 px-5 bg-[#64625c1a] text-[16px] rounded-br-full rounded-bl-full rounded-tl-full"
                  />
                  <h1 className="font-bold">Email: </h1>
                  <input
                    type="email"
                    name="email"
                    value={updateProfile.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="py-2 px-5 bg-[#64625c1a] text-[16px] rounded-br-full rounded-bl-full rounded-tl-full"
                  />
                </div>
                <div className="flex flex-col justify-around space-y-4">
                  <h1 className="font-bold text-lg">Gender:</h1>
                  <div className="flex items-center space-x-8">
                    {" "}
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={updateProfile.gender === "Male"}
                        onChange={() =>
                          setUpdateProfile({
                            ...updateProfile,
                            gender: "Male",
                          })
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={updateProfile.gender === "Female"}
                        onChange={() =>
                          setUpdateProfile({
                            ...updateProfile,
                            gender: "Female",
                          })
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Female</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={updateProfile.gender === "Other"}
                        onChange={() =>
                          setUpdateProfile({
                            ...updateProfile,
                            gender: "Other",
                          })
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Other</span>
                    </label>
                  </div>
                </div>

                <div className="items-center flex flex-col justify-center">
                  <div className="w-full my-2">
                    <h1 className="font-bold">Current Address: </h1>
                    <input
                      type="text"
                      name="address"
                      value={updateProfile.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      className="py-2 px-5 w-full bg-[#64625c1a] text-[16px] rounded-br-full rounded-bl-full rounded-tl-full"
                    />
                  </div>
                  <div className="w-full my-2">
                    <h1 className="font-bold"> Upload Profile Image </h1>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                      onChange={(e) => setImageSelected(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="mt-5 w-full text-center bg-[#f9da78] text-[16px] rounded-full inline-block">
                  <button
                    className="px-5 py-2 text-center text-black"
                    onClick={handleUpdate}
                  >
                    Update Information
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[95%] mx-auto">
        <h1 className="text-[#48752c] text-xl font-semibold">
          Redeem Vouchers
        </h1>
        <div className="w-full">
          {/* Voucher 1 - 40% Off */}
          <div className="flex justify-between items-center mt-5">
            <div className="w-[48%] flex justify-start">
              <div className="w-[90%] relative">
                <img
                  src={Off40}
                  alt="40%off"
                  className="w-full h-auto rounded-xl"
                />
                {profile.ecoscore <= 500 && (
                  <div className="bg-black rounded-xl bg-opacity-70 absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
                    <img
                      width="50"
                      height="50"
                      src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/f9da78/external-lock-call-to-action-bearicons-glyph-bearicons.png"
                      alt="external-lock-call-to-action-bearicons-glyph-bearicons"
                    />
                    <span className="text-[#f9da78] text-sm mt-2">
                      You need only {500 - profile.ecoscore} ECO points to
                      unlock Voucher
                    </span>
                  </div>
                )}
              </div>
              <div className="h-full bg-opacity-70 flex justify-center items-center">
                {profile.ecoscore >= 500 && (
                  <div
                    className="py-1 cursor-pointer px-2 border-[3px] border-[#DF5900] bg-white rounded-lg text-[#DF5900] font-semibold"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "upright",
                    }}
                    onClick={() => handleCollect(500)}
                  >
                    COLLECT
                  </div>
                )}
              </div>
            </div>

            {/* Voucher 2 - 50% Off */}
            <div className="w-[48%] flex justify-start">
              <div className="w-[90%] relative">
                <img
                  src={Off50}
                  alt="50%off"
                  className="w-full h-auto rounded-xl"
                />
                {profile.ecoscore <= 1000 && (
                  <div className="bg-black rounded-xl bg-opacity-70 absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
                    <img
                      width="50"
                      height="50"
                      src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/f9da78/external-lock-call-to-action-bearicons-glyph-bearicons.png"
                      alt="external-lock-call-to-action-bearicons-glyph-bearicons"
                    />
                    <span className="text-[#f9da78] text-sm mt-2">
                      You need only {1000 - profile.ecoscore} ECO points to
                      unlock Voucher
                    </span>
                  </div>
                )}
              </div>
              <div className="h-full bg-opacity-70 flex justify-center items-center">
                {profile.ecoscore >= 1000 && (
                  <div
                    className="py-1 px-2 border-[3px] border-[#DF5900] bg-white rounded-lg text-[#DF5900] font-semibold"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "upright",
                    }}
                    onClick={() => handleCollect(1000)}
                  >
                    COLLECT
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Voucher 3 - 60% Off */}
          <div className="flex justify-between items-center mt-5">
            <div className="w-[48%] flex justify-start">
              <div className="w-[90%] relative">
                <img
                  src={Off60}
                  alt="60%off"
                  className="w-full h-auto rounded-xl"
                />
                {profile.ecoscore < 1500 && (
                  <div className="bg-black rounded-xl bg-opacity-70 absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
                    <img
                      width="50"
                      height="50"
                      src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/f9da78/external-lock-call-to-action-bearicons-glyph-bearicons.png"
                      alt="external-lock-call-to-action-bearicons-glyph-bearicons"
                    />
                    <span className="text-[#f9da78] text-sm mt-2">
                      You need only {1500 - profile.ecoscore} ECO points to
                      unlock Voucher
                    </span>
                  </div>
                )}
              </div>
              <div className="h-full bg-opacity-70 flex justify-center items-center">
                {profile.ecoscore >= 1500 && (
                  <div
                    className="py-1 px-2 border-[3px] border-[#DF5900] bg-white rounded-lg text-[#DF5900] font-semibold"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "upright",
                    }}
                    onClick={() => handleCollect(1500)}
                  >
                    COLLECT
                  </div>
                )}
              </div>
            </div>

            {/* Voucher 4 - 70% Off */}
            <div className="w-[48%] flex justify-start">
              <div className="w-[90%] relative">
                <img
                  src={Off70}
                  alt="70%off"
                  className="w-full h-auto rounded-xl"
                />
                {profile.ecoscore < 2000 && (
                  <div className="bg-black rounded-xl bg-opacity-70 absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
                    <img
                      width="50"
                      height="50"
                      src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/f9da78/external-lock-call-to-action-bearicons-glyph-bearicons.png"
                      alt="external-lock-call-to-action-bearicons-glyph-bearicons"
                    />
                    <span className="text-[#f9da78] text-sm mt-2">
                      You need only {2000 - profile.ecoscore} ECO points to
                      unlock Voucher
                    </span>
                  </div>
                )}
              </div>
              <div className="h-full bg-opacity-70 flex justify-center items-center">
                {profile.ecoscore >= 2000 && (
                  <div
                    className="py-1 px-2 border-[3px] border-[#DF5900] bg-white rounded-lg text-[#DF5900] font-semibold"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "upright",
                    }}
                    onClick={() => handleCollect(2000)}
                  >
                    COLLECT
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </UserDrawer>
  );
};

export default UserProfile;
