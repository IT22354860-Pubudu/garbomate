import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../components/ResposiveDrawer";
import { updateInquiry } from "../../../api/inquiryApi"; // Make sure the API function path is correct
import { ToastContainer, toast } from "react-toastify";

const AdminInquiryUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState(location.state.inquiry.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the updateInquiry function with the new status and inquiry ID
      await updateInquiry(location.state.inquiry._id, status);

      // Show success toast
      toast.success("Inquiry status has been updated successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Navigate to the admin inquiry page after a short delay
      setTimeout(() => {
        navigate("/admin/inquiries");
      }, 3000); // Adjust the delay as needed (3000ms = 3 seconds)
    } catch (error) {
      console.error("Error updating inquiry status:", error.message);
      toast.error("Failed to update inquiry status.");
    }
  };

  return (
    <ResponsiveDrawer>
      <div className="max-w-[70%] mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Update Inquiry Status</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700">User Email</label>
              <input
                type="text"
                value={location.state.inquiry.email}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                value={location.state.inquiry.phone}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={location.state.inquiry.title}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700">Inquiry Type</label>
              <input
                type="text"
                value={location.state.inquiry.inquiryType}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              value={location.state.inquiry.description}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-[30%] py-2 px-4 bg-[#48752c] text-white rounded-md hover:bg-[#f9da78] hover:text-black hover:font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Status
          </button>
        </form>
      </div>
      <ToastContainer />
    </ResponsiveDrawer>
  );
};

export default AdminInquiryUpdate;
