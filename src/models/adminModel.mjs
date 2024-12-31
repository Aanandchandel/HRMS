import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    enum: [process.env.ADMIN_EMAIL,"jacklinuxnd@gmail.com"]
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })