import express from "express";
import ContactController from "../controllers/ContactController.mjs";

const router = express.Router();

// Routes
router.post("/", ContactController.createContact);
router.get("/", ContactController.getAllContacts);
router.get("/:id", ContactController.getContactById);
router.put("/:id", ContactController.updateContact);
router.delete("/:id", ContactController.deleteContact);

export default router;
