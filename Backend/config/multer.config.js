import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads directory if not exists
const uploadPath = path.join(process.cwd(), "public/images");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);

        const fileName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

        cb(null, fileName);
    },
});


// Multer upload instance
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

export default upload;