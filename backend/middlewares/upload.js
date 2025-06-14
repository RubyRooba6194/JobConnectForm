// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const allowed = [".pdf", ".doc", ".docx"];

// const fileFilter = (req, file, cb) => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (allowed.includes(ext)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF, DOC, and DOCX files are allowed!"), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
// });

// export default upload;


import multer from "multer";
import path from "path";

// Configure storage for uploaded resumes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

export default upload;