import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../components/ResposiveDrawer";
import { deleteInquiry, getAllInquiries } from "../../../api/inquiryApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "react-toastify/dist/ReactToastify.css";

// MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);
  const [stateFilter, setStateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchAllInquiries = async () => {
    try {
      const res = await getAllInquiries(); // Call the API to fetch inquiries
      console.log(res);

      setInquiries(res); // Assuming setinquiries is your state setter for garbage data
    } catch (error) {
      alert(error.message);
      console.error("Error fetching inquiries: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllInquiries();
    // console.log(inquiries);
  }, []);

  useEffect(() => {
    filterInquiries();
  }, [statusFilter, stateFilter, inquiries]);

  const filterInquiries = () => {
    let filtered = inquiries;
    if (statusFilter) {
      filtered = filtered.filter((inquiry) => inquiry.status === statusFilter);
    }
    if (stateFilter) {
      filtered = filtered.filter((inquiry) => inquiry.state === stateFilter);
    }
    setFilteredInquiries(filtered);
  };

  const handleClickOpen = (id) => {
    // console.log(`id => `, id);
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
        // console.log("Error deleting garbage: ", error);
      }
    }
  };

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

  const handleEditClick = (inquiry) => {
    navigate("/admin/inquiries/update", { state: { inquiry } });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const imgLogo = new Image();
    imgLogo.src = "../src/assets/GarboMate.png";

    console.log("Image path: ", imgLogo.src);
    imgLogo.onload = () => {
      //Header
      doc.addImage(imgLogo, "PNG", 14, 5, 55, 15);

      doc.setFont("helvetica", "bold");
      doc.setTextColor("48752c");
      doc.setFontSize(16);
      doc.text("GarboMate Waste Management System", 95, 15);

      // Add title
      doc.setFontSize(20);
      doc.text("Filtered Inquiries Report", 14, 28);

      // Add current date
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated Date: ${new Date().toLocaleString()}`, 14, 35);

      // Summary Table by Status and State
      autoTable(doc, {
        startY: 42,
        head: [["Summary", "Count"]],
        body: [
          ["Total Inquiries", filteredInquiries.length],
          [
            "Pending Inquiries",
            filteredInquiries.filter((i) => i.status === "Pending").length,
          ],
          [
            "In Progress Inquiries",
            filteredInquiries.filter((i) => i.status === "In Progress").length,
          ],
          [
            "Resolved Inquiries",
            filteredInquiries.filter((i) => i.status === "Resolved").length,
          ],
        ],
        theme: "grid",
      });

      // Add Inquiry Data Table
      autoTable(doc, {
        startY: doc.autoTable.previous.finalY + 10,
        head: [
          ["Email", "Phone", "Title", "Type", "Status", "Description", "Date"],
        ],
        body: filteredInquiries.map((inquiry) => [
          inquiry.email,
          inquiry.phone,
          inquiry.title,
          inquiry.inquiryType,
          inquiry.status,
          inquiry.description,
          new Date(inquiry.date).toLocaleString(),
        ]),
        theme: "grid",
      });

      // Save the PDF
      const generatedDate = new Date().toLocaleDateString().replace(/\//g, "-");
      doc.save(`Inquiries_Report_${generatedDate}.pdf`);

      // Show success notification
      toast.success("PDF Generated Successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };
  };

  return (
    <ResponsiveDrawer>
      <div className="mb-28 shadow-md rounded-lg">
        <div className="flex justify-between p-4">
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Filter By</span>
            <FormControl className="w-44">
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button variant="contained" color="success" onClick={downloadPDF}>
            Generate Report
          </Button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-[#48752c] bg-white :text-white :bg-gray-800">
            Inquiry Requests
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Email
              </th> */}
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
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
              <th scope="col" className="px-4 py-3">
                <span className="sr-only"></span>
              </th>
              <th scope="col" className="px-5 py-3">
                <span className="sr-only"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.length > 0 ? (
              filteredInquiries
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date
                .map((inquiry) => (
                  <tr className="bg-white border-b" key={inquiry._id}>
                    <td className="px-6 py-4">{inquiry.email}</td>
                    <td className="px-6 py-4">{inquiry.phone}</td>
                    <td className="px-6 py-4">{inquiry.title}</td>
                    <td className="px-6 py-4">{inquiry.inquiryType}</td>
                    <td className="px-6 py-4">{inquiry.description}</td>
                    <td className="px-6 py-4">
                      {new Date(inquiry.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClassName(
                          inquiry.status
                        )}`}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{inquiry.state}</td>
                    <td className="px-4 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEditClick(inquiry)}
                      >
                        <EditIcon />
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => handleClickOpen(inquiry._id)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr className="bg-white border-b">
                <td className="px-6 py-4 text-center" colSpan="10">
                  No inquiries found.
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
    </ResponsiveDrawer>
  );
};

export default AdminInquiries;
