import express from "express";
import ClientController from "../controllers/ClientController.mjs";
import  upload from "../services/uplodeFile.mjs"
const router = express.Router();

// Routes
router.post("/" ,upload.single("client_picture") ,ClientController.createClient);
router.get("/", ClientController.getAllClients);
router.get("/:id", ClientController.getClientById);
router.put("/:id", ClientController.updateClient);
router.delete("/:id", ClientController.deleteClient);

export default router;
