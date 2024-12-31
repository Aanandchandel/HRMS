import Overtime from "../models/Overtime.mjs";
import Employee from "../models/Employee.mjs";

class OvertimeController {
  // Create a new overtime entry
  async createOvertime(req, res) {
    const { employee_id, overtime_date, overtime_hours, description } = req.body;

    try {
      // Verify that the employee exists
      const employee = await Employee.findById(employee_id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const newOvertime = new Overtime({
        employee_id,
        overtime_date,
        overtime_hours,
        description,
      });

      await newOvertime.save();
      res.status(201).json({ message: "Overtime entry created successfully", overtime: newOvertime });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all overtime entries
  async getAllOvertime(req, res) {
    try {
      const overtimeEntries = await Overtime.find().populate("employee_id", "first_name last_name email");
      res.status(200).json(overtimeEntries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get an overtime entry by ID
  async getOvertimeById(req, res) {
    try {
      const overtime = await Overtime.findById(req.params.id).populate("employee_id", "first_name last_name email");

      if (!overtime) {
        return res.status(404).json({ message: "Overtime entry not found" });
      }

      res.status(200).json(overtime);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update an overtime entry
  async updateOvertime(req, res) {
    const { employee_id, overtime_date, overtime_hours, description } = req.body;

    try {
      // Verify the employee if employee_id is being updated
      if (employee_id) {
        const employee = await Employee.findById(employee_id);
        if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
        }
      }

      const overtime = await Overtime.findByIdAndUpdate(
        req.params.id,
        { employee_id, overtime_date, overtime_hours, description },
        { new: true, runValidators: true }
      );

      if (!overtime) {
        return res.status(404).json({ message: "Overtime entry not found" });
      }

      res.status(200).json({ message: "Overtime entry updated successfully", overtime });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete an overtime entry
  async deleteOvertime(req, res) {
    try {
      const overtime = await Overtime.findByIdAndDelete(req.params.id);

      if (!overtime) {
        return res.status(404).json({ message: "Overtime entry not found" });
      }

      res.status(200).json({ message: "Overtime entry deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new OvertimeController();
