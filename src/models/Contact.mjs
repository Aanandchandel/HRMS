import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Invalid email format"],
  },
  number: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10,15}$/, "Invalid phone number"], // Customize pattern as per your requirement
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
