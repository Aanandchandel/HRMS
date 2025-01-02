import express from "express";
import  upload from "../services/uplodeFile.mjs"
import EmployeeController from "../controllers/EmployeeController.mjs";


const router = express.Router();

// Routes
router.post("/", upload.single("employee_picture"), EmployeeController.createEmployee);
router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.put("/:id", upload.single("employee_picture"), EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

export default router;
