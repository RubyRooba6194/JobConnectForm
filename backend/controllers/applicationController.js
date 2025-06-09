const Application = require("../models/Application");

const submitApplication = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      street,
      city,
      state,
      postalCode,
      country,
      education,
      experience,
      statement,
    } = req.body;

    const resumePath = req.file ? req.file.path : null;

    const newApp = new Application({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      street,
      city,
      state,
      postalCode,
      country,
      education,
      experience,
      statement,
      resumePath,
    });

    await newApp.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { submitApplication };
