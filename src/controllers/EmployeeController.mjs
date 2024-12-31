import Employee from "../models/Employee.mjs";

class EmployeeController {
  // Create a new employee
  async createEmployee(req, res) {
    try {
      const employeeData = req.body;

      if (req.file) {
        employeeData.employee_picture = req.file.path; // Save file path if provided
      }

      const newEmployee = new Employee(employeeData);
      await newEmployee.save();

      res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all employees
  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a single employee by ID
  async getEmployeeById(req, res) {
    try {
      const employee = await Employee.findById(req.params.id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update an employee
  async updateEmployee(req, res) {
    try {
      const updatedData = req.body;

      if (req.file) {
        updatedData.employee_picture = req.file.path; // Update file path if provided
      }

      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true, runValidators: true }
      );

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json({ message: "Employee updated successfully", employee });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete an employee
  async deleteEmployee(req, res) {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new EmployeeController();
