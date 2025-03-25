import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({
  truckNumber: {
    type: String,
    required: true,
    unique: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  driverNumber: {
    type: String,
    required: true,
  },
  availabilityStatus: {
    type: Boolean,
    required: true,
    default: true,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
});

const Truck = mongoose.model("Truck", truckSchema);

export default Truck;
