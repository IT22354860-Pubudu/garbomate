import asyncHandler from "../middlewares/asyncHandler.js";
import Truck from "../models/truckModel.js";

// Create a new truck
const createTruck = asyncHandler(async (req, res) => {
  const newTruck = new Truck(req.body);
  const savedTruck = await newTruck.save();
  res.status(201).json(savedTruck);
});

// Get all trucks
const getAllTrucks = asyncHandler(async (req, res) => {
  const trucks = await Truck.find();
  res.status(200).json(trucks);
});

// Update a truck
const updateTruck = asyncHandler(async (req, res) => {
  const updatedTruck = await Truck.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedTruck) {
    res.status(404);
    throw new Error("Truck not found");
  }
  res.status(200).json(updatedTruck);
});

// Delete a truck
const deleteTruck = asyncHandler(async (req, res) => {
  const deletedTruck = await Truck.findByIdAndDelete(req.params.id);
  if (!deletedTruck) {
    res.status(404);
    throw new Error("Truck not found");
  }
  res.status(200).json({ message: "Truck deleted successfully" });
});

// Get truck by driverName and truckNumber
const getTruckByDriverAndNumber = asyncHandler(async (req, res) => {
  // console.log(`req.query => `, req);
  const { driverName, truckNumber } = req.body;
  const truck = await Truck.findOne({ driverName, truckNumber });
  if (!truck) {
    res.status(404);
    throw new Error("Truck not found");
  }
  res.status(200).json(truck);
});

export {
  createTruck,
  getAllTrucks,
  updateTruck,
  deleteTruck,
  getTruckByDriverAndNumber,
};
