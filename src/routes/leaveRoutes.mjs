import express from "express";
import LeaveController from "../controllers/LeaveController.mjs";

const router = express.Router();

// Routes
router.post("/", LeaveController.createLeave);
router.get("/", LeaveController.getAllLeaves);
router.get("/:id", LeaveController.getLeaveById);
router.put("/:id", LeaveController.updateLeave);
router.delete("/:id", LeaveController.deleteLeave);

export default router;
