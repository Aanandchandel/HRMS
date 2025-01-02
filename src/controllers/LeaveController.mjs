import Leave from "../models/Leave.mjs";
import Employee from "../models/Employee.mjs";

class LeaveController {
  // Create a new leave request
  async createLeave(req, res) {
    const { employee_id, leave_type, from_date, to_date, leave_reason, status } = req.body;

    try {
      // Verify that the employee exists
      const employee = await Employee.findById(employee_id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const newLeave = new Leave({
        employee_id,
        leave_type,
        from_date,
        to_date,
        leave_reason,
        status,
      });

      await newLeave.save();
      res.status(201).json({ message: "Leave request created successfully", leave: newLeave });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all leave requests
  async getAllLeaves(req, res) {
    try {
      const leaves = await Leave.find().populate("employee_id", "first_name last_name email");
      res.status(200).json(leaves);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a leave request by ID
  async getLeaveById(req, res) {
    try {
      const leave = await Leave.findById(req.params.id).populate("employee_id", "first_name last_name email");

      if (!leave) {
        return res.status(404).json({ message: "Leave request not found" });
      }

      res.status(200).json(leave);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a leave request
  async updateLeave(req, res) {
    const { leave_type, from_date, to_date, leave_reason, status } = req.body;

    try {
      const leave = await Leave.findByIdAndUpdate(
        req.params.id,
        { leave_type, from_date, to_date, leave_reason, status },
        { new: true, runValidators: true }
      );

      if (!leave) {
        return res.status(404).json({ message: "Leave request not found" });
      }

      res.status(200).json({ message: "Leave request updated successfully", leave });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a leave request
  async deleteLeave(req, res) {
    try {
      const leave = await Leave.findByIdAndDelete(req.params.id);

      if (!leave) {
        return res.status(404).json({ message: "Leave request not found" });
      }

      res.status(200).json({ message: "Leave request deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new LeaveController();
