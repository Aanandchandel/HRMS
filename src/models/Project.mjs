import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: [true, "Project name is required"],
    trim: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: [true, "Client ID is required"],
  },
  start_date: {
    type: Date,
    required: [true, "Start date is required"],
  },
  end_date: {
    type: Date,
    validate: {
      validator: function (value) {
        return value >= this.start_date;
      },
      message: "End date must be greater than or equal to start date",
    },
  },
  rate: {
    type: Number,
    required: [true, "Rate is required"],
  },
  rate_type: {
    type: String,
    enum: ["Hourly", "Fixed"],
    required: [true, "Rate type is required"],
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  project_leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "Project leader ID is required"],
  },
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  description: {
    type: String,
    trim: true,
  },
  project_file: {
    type: String,
    default: null, // Path to the project file
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
