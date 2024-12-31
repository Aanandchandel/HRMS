import mongoose from "mongoose";

const overtimeSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  overtime_date: {
    type: Date,
    required: true,
  },
  overtime_hours: {
    type: Number,
    required: true,
    min: [1, "Overtime hours must be at least 1"],
  },
  description: {
    type: String,
    trim: true,
    default: null,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Overtime = mongoose.model("Overtime", overtimeSchema);
export default Overtime;
