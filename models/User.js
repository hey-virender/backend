import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, //Name is required
  email: { type: String, required: true, unique: true }, //Email is required
  phone: { type: String, required: true }, // Phone number
  address: { type: String, required: true }, // Address
  highestQualification: { type: String, required: true }, // Highest qualification
  desiredJobRole: { type: String, required: true }, // Desired job role
  experience: { type: Number, required: true }, // Experience in years
  expectedCTC: { type: Number, required: true }, // Expected CTC in currency
  resume: { type: String, required: true }, // Path to the resume file
  linkedinProfile: { type: String }, // Optional LinkedIn profile link
  portfolioWebsite: { type: String }, // Optional portfolio or personal website
  coverLetter: { type: String }, // Optional cover letter text
  dateApplied: { type: Date, default: Date.now }, // Date when the user applied
});

const User = mongoose.model("User", userSchema);

export default User;
