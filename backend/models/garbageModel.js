import mongoose from "mongoose";

const garbageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User who made the request
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    typeOfGarbage: {
      type: String,
      required: true,
      enum: ["Organic", "Recyclable", "Non-Recyclable", "Hazardous", "E-Waste"],
    },
    area: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Collected", "In Progress"],
      default: "Pending",
    },
    collectionDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Garbage = mongoose.model("Garbage", garbageSchema);

export default Garbage;
