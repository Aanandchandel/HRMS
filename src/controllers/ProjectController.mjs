import Project from "../models/Project.mjs";
import Client from "../models/Client.mjs";
import Employee from "../models/Employee.mjs";

class ProjectController {
  // Create a new project
  async createProject(req, res) {
    const { project_name, client, start_date, end_date, rate, rate_type, priority, project_leader, team, description, project_file } = req.body;

    try {
      // Validate client and project leader IDs
      const clientExists = await Client.findById(client);
      if (!clientExists) {
        return res.status(404).json({ message: "Client not found" });
      }

      const leaderExists = await Employee.findById(project_leader);
      if (!leaderExists) {
        return res.status(404).json({ message: "Project leader not found" });
      }

      // Validate team members
      if (team && team.length > 0) {
        const invalidTeamMembers = await Promise.all(team.map(async (id) => {
          const employee = await Employee.findById(id);
          return employee ? null : id;
        }));

        const invalidIds = invalidTeamMembers.filter((id) => id !== null);
        if (invalidIds.length > 0) {
          return res.status(400).json({ message: "Invalid team member IDs", invalidIds });
        }
      }

      const newProject = new Project({
        project_name,
        client,
        start_date,
        end_date,
        rate,
        rate_type,
        priority,
        project_leader,
        team,
        description,
        project_file,
      });

      await newProject.save();
      res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all projects
  async getAllProjects(req, res) {
    try {
      const projects = await Project.find()
        .populate("client", "first_name last_name email")
        .populate("project_leader", "first_name last_name email")
        .populate("team", "first_name last_name email")
        .sort({ createdAt: -1 });

      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a project by ID
  async getProjectById(req, res) {
    try {
      const project = await Project.findById(req.params.id)
        .populate("client", "first_name last_name email")
        .populate("project_leader", "first_name last_name email")
        .populate("team", "first_name last_name email");

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a project
  async updateProject(req, res) {
    const { project_name, client, start_date, end_date, rate, rate_type, priority, project_leader, team, description, project_file } = req.body;

    try {
      const project = await Project.findByIdAndUpdate(
        req.params.id,
        { project_name, client, start_date, end_date, rate, rate_type, priority, project_leader, team, description, project_file },
        { new: true, runValidators: true }
      );

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json({ message: "Project updated successfully", project });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a project
  async deleteProject(req, res) {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ProjectController();
