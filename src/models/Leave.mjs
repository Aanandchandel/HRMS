import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  leave_type: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Paid Leave", "Unpaid Leave", "Other"],
    required: true,
  },
  from_date: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.from_date;
      },
      message: "to_date must be greater than or equal to from_date",
    },
  },
  leave_reason: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
