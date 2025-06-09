import Application from "../models/Application.js";

export const submitApplication = async (req, res) => {
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

export const getAllApplications = async (req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    // Add resume URL for each app
    const host = req.protocol + "://" + req.get("host");
    const applicationsWithUrl = apps.map((app) => ({
      ...app._doc,
      resumeUrl: app.resumePath
        ? `${host}/${app.resumePath.replace(/\\/g, "/")}`
        : null,
      fullName: app.firstName + " " + app.lastName,
    }));
    res.json(applicationsWithUrl);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
