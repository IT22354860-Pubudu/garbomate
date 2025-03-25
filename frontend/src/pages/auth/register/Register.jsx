import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import logo from "../../../assets/GarboMate.png";
import AuthService from "../../../api/userApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageSelected, setImageSelected] = useState("");
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const navigate = useNavigate();

  const [userEntryData, setUserEntryData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    ecoscore: "",
    address: "",
    contact: "",
    confirmPassword: "",
  });

  const {
    username,
    email,
    password,
    gender,
    address,
    contact,
    confirmPassword,
  } = userEntryData;
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUserEntryData({
      ...userEntryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    let uploadedImageUrl;

    uploadedImageUrl = await uploadImage();
    console.log(uploadedImageUrl);
    const newUserEntry = {
      username,
      email,
      password,
      gender,
      ecoscore: "500",
      address,
      contact,
      profileImage: uploadedImageUrl,
    };

    try {
      console.log(newUserEntry);
      await AuthService.register(newUserEntry);

      toast.success("Your Account has been created successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

    const imageUrl = await res.json();
    return imageUrl.url;
  };

  return (
    <section className="bg-gray-50 flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 :text-white justify-center"
      >
        <img className="w-52" src={logo} alt="Logo" />
      </a>
      <div className="w-[70%] bg-white rounded-lg shadow :border :bg-gray-800 :border-gray-700">
        <div className="p-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white text-center">
            Sign Up
          </h1>
          <form
            className="w-full flex justify-between my-4"
            onSubmit={handleSubmit}
          >
            <div className="w-[45%] space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="Enter name"
                  required
                  value={username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={handleChange}
                />
              </div>

              {/* Address Input */}
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="Enter Address"
                  required
                  value={address}
                  onChange={handleChange}
                />
              </div>
              {/* Contact Input */}
              <div>
                <label
                  htmlFor="contact"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="Enter Contact Number"
                  required
                  pattern="\d{10}"
                  minLength={10}
                  maxLength={10}
                  value={contact}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="w-[45%] space-y-4">
              {/* Gender Input */}
              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Gender
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      className="form-radio text-blue-600"
                      checked={gender === "Male"}
                      onChange={handleChange}
                      required
                    />
                    <span className="ml-2 text-gray-900 :text-white">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      className="form-radio text-blue-600"
                      checked={gender === "Female"}
                      onChange={handleChange}
                      required
                    />
                    <span className="ml-2 text-gray-900 :text-white">
                      Female
                    </span>
                  </label>
                </div>
              </div>
              {/* Image Input */}
              <div>
                <label
                  htmlFor="contact"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Upload Profile Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  onChange={(e) => setImageSelected(e.target.files[0])}
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Error Message Display */}
              {errorMessage && (
                <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full mt-8 text-white bg-[#527436] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Create an account"}
              </button>
            </div>
          </form>
          <p className="text-sm font-light text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Register;
