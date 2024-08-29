import multer from "multer";

// Configure Multer to use memory storage
const storage = multer.memoryStorage();

// File filter to accept only .docx and .pdf files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only .docx and .pdf files are allowed."),
      false
    ); // Reject the file
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
