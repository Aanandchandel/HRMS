import express from "express";
import HolidayController from "../controllers/HolidayController.mjs";

const router = express.Router();

// Routes
router.post("/", HolidayController.createHoliday);
router.get("/", HolidayController.getAllHolidays);
router.get("/:id", HolidayController.getHolidayById);
router.put("/:id", HolidayController.updateHoliday);
router.delete("/:id", HolidayController.deleteHoliday);

export default router;
