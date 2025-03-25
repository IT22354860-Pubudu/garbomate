import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InquirySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User", // Reference to the User who made the request
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  inquiryType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved", "In Progress"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Inquiry = mongoose.model("inquiry", InquirySchema);

export default Inquiry;
