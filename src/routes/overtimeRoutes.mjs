import express from "express";
import OvertimeController from "../controllers/OvertimeController.mjs";

const router = express.Router();

// Routes
router.post("/", OvertimeController.createOvertime);
router.get("/", OvertimeController.getAllOvertime);
router.get("/:id", OvertimeController.getOvertimeById);
router.put("/:id", OvertimeController.updateOvertime);
router.delete("/:id", OvertimeController.deleteOvertime);

export default router;
