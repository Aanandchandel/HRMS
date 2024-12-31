import express from "express";
import multer from "multer";
import EmployeeController from "../controllers/EmployeeController.mjs";

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Directory for file uploads
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = express.Router();

// Routes
router.post("/", upload.single("employee_picture"), EmployeeController.createEmployee);
router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.put("/:id", upload.single("employee_picture"), EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

export default router;
