import express from "express";
import {
  createTruck,
  getAllTrucks,
  updateTruck,
  deleteTruck,
  getTruckByDriverAndNumber,
} from "../controllers/truckController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new truck
router
  .route("/")
  .post(getTruckByDriverAndNumber)
  .post(authenticate, authorizeAdmin, createTruck)
  .get(authenticate, authorizeAdmin, getAllTrucks);

// Route to update and delete a truck
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, updateTruck)
  .delete(authenticate, authorizeAdmin, deleteTruck);

export default router;
