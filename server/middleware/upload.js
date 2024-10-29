import multer from "multer";

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/uploads/"); // Folder to store uploaded images
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}`);
    },
});


// Initialize multer with storage and file filter
const upload = multer({ storage });

export default upload;
