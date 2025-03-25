import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInquiry } from "../../../api/inquiryApi";
import UserDrawer from "../components/UserDrawer";
import "../../../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inquiry = () => {
  const navigate = useNavigate();
  const [inquiryData, setInquiryData] = useState({
    email: "",
    phone: "",
    title: "",
    description: "",
    inquiryType: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const { email, phone, title, description, inquiryType } = inquiryData;

  const onChange = (e) =>
    setInquiryData({ ...inquiryData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("inquiryData => ", inquiryData);
    const newInquiry = {
      email,
      phone,
      title,
      description,
      inquiryType,
    };

    try {
      await createInquiry(newInquiry);
      toast.success("Inquiry has been created successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/user/my-inquiry");
        setIsModalOpen(false); // Close modal on successful submission
      }, 2000);
    } catch (err) {
      alert(err);
      console.log("Inquiry creating error => ", err);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex justify-end mb-4">
          {/* Button to open the modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Make a new inquiry
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                &#x2715;
              </button>

              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Make a new inquiry
              </h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="flex flex-col gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="flex w-full gap-3">
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Phone number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={(e) => onChange(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Enter phone number"
                        required
                        maxLength="10"
                        minLength="10"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Inquiry Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={title}
                      onChange={(e) => onChange(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type inquiry title"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="type"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Inquiry type
                    </label>
                    <select
                      name="inquiryType"
                      value={inquiryType}
                      onChange={(e) => onChange(e)}
                      id="type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option value="" disabled>
                        Choose type
                      </option>
                      <option value="time">Time</option>
                      <option value="garbage_bins">Garbage Bins</option>
                      <option value="trucks">Trucks</option>
                      <option value="payments">Payments</option>
                      <option value="customer_care">Customer Care</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="8"
                      name="description"
                      value={description}
                      onChange={(e) => onChange(e)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Your description here"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center bg-[#48752c] px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Inquiry;
