import express from "express";
import {
  createGarbageRequest,
  getAllGarbageRequests,
  getUserGarbageRequests,
  getGarbageRequestById,
  updateGarbageRequest,
  deleteGarbageRequest,
} from "../controllers/garbageController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, createGarbageRequest)
  .get(authenticate, authorizeAdmin, getAllGarbageRequests);

router.route("/driver-garbage").get(getAllGarbageRequests);
router.route("/garbage-requests").get(authenticate, getUserGarbageRequests);

router
  .route("/:id")
  .get(authenticate, getGarbageRequestById)
  .put(authenticate, authorizeAdmin, updateGarbageRequest)
  .delete(authenticate, deleteGarbageRequest);

export default router;
