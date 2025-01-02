import Holiday from "../models/Holiday.mjs";

class HolidayController {
  // Create a new holiday
  async createHoliday(req, res) {
    const { title, date, day } = req.body;

    try {
      const newHoliday = new Holiday({
        title,
        date,
        day,
      });

      await newHoliday.save();
      res.status(201).json({ message: "Holiday created successfully", holiday: newHoliday });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all holidays
  async getAllHolidays(req, res) {
    try {
      const holidays = await Holiday.find().sort({ date: 1 });
      res.status(200).json(holidays);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a holiday by ID
  async getHolidayById(req, res) {
    try {
      const holiday = await Holiday.findById(req.params.id);

      if (!holiday) {
        return res.status(404).json({ message: "Holiday not found" });
      }

      res.status(200).json(holiday);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a holiday
  async updateHoliday(req, res) {
    const { title, date, day } = req.body;

    try {
      const holiday = await Holiday.findByIdAndUpdate(
        req.params.id,
        { title, date, day },
        { new: true, runValidators: true }
      );

      if (!holiday) {
        return res.status(404).json({ message: "Holiday not found" });
      }

      res.status(200).json({ message: "Holiday updated successfully", holiday });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a holiday
  async deleteHoliday(req, res) {
    try {
      const holiday = await Holiday.findByIdAndDelete(req.params.id);

      if (!holiday) {
        return res.status(404).json({ message: "Holiday not found" });
      }

      res.status(200).json({ message: "Holiday deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new HolidayController();
