import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    education: { type: String, required: true },
    experience: { type: String, required: true }, // years as string/number
    statement: { type: String, required: true },
    resumePath: { type: String },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;
