import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDrawer from "../components/UserDrawer";
import { getUserAllInquiries } from "../../../api/inquiryApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteInquiry, getAllInquiries } from "../../../api/inquiryApi";

// MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Inquiry from "../inquiry/Inquiry";

const UserInquiryRequest = () => {
  const [inquiries, setInquiries] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);
  const navigate = useNavigate();

  const fetchAllInquiries = async () => {
    try {
      const res = await getUserAllInquiries(); // Call the API to fetch garbages
      setInquiries(res); // Assuming setGarbages is your state setter for garbage data
    } catch (error) {
      // alert(error.message);
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.error("Error fetching inquiries: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllInquiries();
  }, []);

  function getStatusClassName(status) {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  }

  const handleClickOpen = (id) => {
    console.log(`id => `, id);
    setSelectedInquiryId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteInquiry = async () => {
    if (selectedInquiryId) {
      try {
        await deleteInquiry(selectedInquiryId);
        setInquiries((currentInquiry) =>
          currentInquiry.filter((inquiry) => inquiry._id !== selectedInquiryId)
        );
        handleClose();
        toast.success("Inquiry has been deleted successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        alert(error.message);
        console.log("Error deleting garbage: ", error);
      }
    }
  };

  return (
    <UserDrawer>
      <Inquiry />
      <div className="mb-28 shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-[#48752c] bg-white :text-white :bg-gray-800">
            Inquiry Requests
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Date Requested
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>

              <th scope="col" className="px-5 py-3">
                <span className="sr-only"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
                .map((inquiry) => (
                  <tr
                    className="bg-white border-b :bg-gray-800 :border-gray-700"
                    key={inquiry._id}
                  >
                    <td className="px-6 py-4 capitalize">
                      <span
                      // className={`uppercase font-semibold text-[12px] px-2.5 py-0.5 rounded ${getTypeClassName(
                      //   inquiry.typeOfinquiry
                      // )}`}
                      >
                        {inquiry.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">{inquiry.inquiryType}</td>
                    <td className="px-6 py-4">{inquiry.description}</td>
                    <td className="px-6 py-4">
                      {new Date(inquiry.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 capitalize">
                      <span
                        className={`uppercase font-semibold text-[12px] px-2.5 py-0.5 rounded ${getStatusClassName(
                          inquiry.status
                        )}`}
                      >
                        {inquiry.status}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-right">
                      <a
                        onClick={() => handleClickOpen(inquiry._id)}
                        className="font-medium text-red-600 :text-blue-500 cursor-pointer"
                      >
                        <DeleteIcon />
                      </a>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="w-full text-md text-gray-600 font-semibold text-center py-4"
                >
                  No inquiry requests found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The selected garbage disposal request will be deleted and cannot be
            retrieved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteInquiry} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </UserDrawer>
  );
};

export default UserInquiryRequest;
