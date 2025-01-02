import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  client_picture: {
    type: String,
    default: null, // Optional file path for client picture
  },
  number: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Invalid phone number format"],
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
