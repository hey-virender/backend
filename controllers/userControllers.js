import User from "../models/User.js";
import bucket from "../config/firebaseConfig.js";
import { format } from "util";
import userSchema from "../schemas/zodSchema.js";

export const signUp = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error:
          "No file uploaded or invalid file type. Only .docx and .pdf files are allowed.",
      });
    }
    const userData = {
      ...req.body,
      resume: req.file,
    };
    userSchema.parse(userData);
    const {
      name,
      email,
      phone,
      address,
      highestQualification,
      desiredJobRole,
      experience,
      expectedCTC,
      linkedinProfile,
      portfolioWebsite,
      coverLetter,
    } = req.body;

   const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists." });
    }
    const existingPhone = await User.findOne({ email: email });
    if (existingPhone) {
      return res.status(400).json({ error: "Phone already exists." });
    }

    // Define the filename for the uploaded file
    const filename = `${email}-${req.file.originalname}`;
    const blob = bucket.file(`resumes/${filename}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      res
        .status(500)
        .json({ error: "Failed to upload resume", details: err.message });
    });

    blobStream.on("finish", async () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      // Save user to database with resume URL
      const newUser = new User({
        name,
        email,
        phone,
        address,
        highestQualification,
        desiredJobRole,
        experience,
        expectedCTC,
        resume: publicUrl,
        linkedinProfile,
        portfolioWebsite,
        coverLetter,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully!" });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to register user", details: err.message });
  }
};
