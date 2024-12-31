import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
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
    match: [/^\d{10,15}$/, "Invalid phone number"],
  },
  company: { type: String, required: true },
  salary: { type: Number, required: true },
  adhar_no: { type: String, unique: true, required: true },
  date_of_joining: { type: Date, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  pincode: { type: String, required: true, match: [/^\d{6}$/, "Invalid pincode"] },
  city: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  employee_type: { type: String, enum: ["Permanent", "Contract", "Intern"], default: "Permanent" },
  birthday: { type: Date, required: true },
  permanent_address: { type: String, required: true },
  reporting_manager: { type: String, required: false },
  employee_picture: { type: String, default: null }, // File path
  area: { type: String, required: false },
  religion: { type: String, required: false },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
