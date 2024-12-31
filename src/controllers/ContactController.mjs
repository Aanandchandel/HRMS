import Contact from "../models/Contact.mjs";

class ContactController {
  // Create a new contact
  async createContact(req, res) {
    const { name, email, number, status } = req.body;

    try {
      const newContact = new Contact({ name, email, number, status });
      await newContact.save();
      res.status(201).json({ message: "Contact created successfully", contact: newContact });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all contacts
  async getAllContacts(req, res) {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a single contact by ID
  async getContactById(req, res) {
    try {
      const contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a contact by ID
  async updateContact(req, res) {
    const { name, email, number, status } = req.body;

    try {
      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { name, email, number, status },
        { new: true, runValidators: true }
      );

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.status(200).json({ message: "Contact updated successfully", contact });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a contact by ID
  async deleteContact(req, res) {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ContactController();
