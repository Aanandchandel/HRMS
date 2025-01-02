import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Holiday title is required"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "Holiday date is required"],
    unique: true, // Ensure no duplicate holidays on the same date
  },
  day: {
    type: String,
    required: [true, "Day is required"],
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Holiday = mongoose.model("Holiday", holidaySchema);
export default Holiday;
