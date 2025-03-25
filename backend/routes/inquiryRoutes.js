import express from "express";
import {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatusById,
  deleteInquiryById,
  getUserInquiryRequests,
} from "../controllers/inquiryController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, createInquiry) // Public route
  .get(authenticate, authorizeAdmin, getAllInquiries); // Admin only

router.route("/inquiry-requests").get(authenticate, getUserInquiryRequests);
router
  .route("/:id")
  .get(authenticate, getInquiryById) // Authenticated users can view
  .put(authenticate, authorizeAdmin, updateInquiryStatusById) // Authenticated users can update
  .delete(authenticate, deleteInquiryById); // Admin only can delete

export default router;
