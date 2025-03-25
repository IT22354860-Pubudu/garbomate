import express from "express";
import {
    createSchedule,
    getAllSchedules,
    getTruckSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule
} from "../controllers/scheduleController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, createSchedule)
  .get(authenticate, getAllSchedules);

router.route("/truck-schedules/:id").get( getTruckSchedules);

router
  .route("/:id")
  .get(authenticate, getScheduleById)
  .put(authenticate, authorizeAdmin, updateSchedule)
  .delete(authenticate, authorizeAdmin, deleteSchedule);

export default router;