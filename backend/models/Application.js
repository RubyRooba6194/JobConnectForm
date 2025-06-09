const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dob: Date,
    gender: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    education: String,
    experience: String,
    statement: String,
    resumePath: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
