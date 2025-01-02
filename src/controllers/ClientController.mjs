import Client from "../models/Client.mjs";

class ClientController {
  // Create a new client
  async createClient(req, res) {
    
    try {
      if (req.file) {
        const client_picture = req.file.path; // Save file path if provided
      }
      const { first_name, last_name, email, number, company } = req.body;
      const newClient = new Client({
        first_name,
        last_name,
        email,
        client_picture,
        number,
        company,
      });
      await newClient.save();
      res.status(201).json({ message: "Client created successfully", client: newClient });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all clients
  async getAllClients(req, res) {
    try {
      const clients = await Client.find().sort({ createdAt: -1 });
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a client by ID
  async getClientById(req, res) {
    try {
      const client = await Client.findById(req.params.id);

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a client
  async updateClient(req, res) {
    const { first_name, last_name, email, client_picture, number, company } = req.body;

    try {
      const client = await Client.findByIdAndUpdate(
        req.params.id,
        { first_name, last_name, email, client_picture, number, company },
        { new: true, runValidators: true }
      );

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.status(200).json({ message: "Client updated successfully", client });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a client
  async deleteClient(req, res) {
    try {
      const client = await Client.findByIdAndDelete(req.params.id);

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ClientController();
