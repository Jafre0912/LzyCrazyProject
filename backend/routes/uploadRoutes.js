const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // <-- THIS IS THE MISSING LINE
const { uploadFile } = require('../controllers/uploadController');

const router = express.Router();

// Multer will save files to a temporary 'uploads' folder inside the backend
const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tempDir = path.join(__dirname, '../temp_uploads');
        // Ensure temp directory exists before trying to save to it
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: tempStorage });

router.post('/upload', upload.single('uploadedFile'), uploadFile);

module.exports = router;