const path = require('path');
const fs = require('fs');

exports.uploadFile = (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'File is required.' });
    }

    const finalUploadPath = process.env.UPLOAD_PATH;

    // Create the final directory if it doesn't exist
    if (!fs.existsSync(finalUploadPath)) {
        fs.mkdirSync(finalUploadPath, { recursive: true });
    }

    const finalSavePath = path.join(finalUploadPath, file.originalname);

    // Move the file from the temp directory to the final directory
    fs.rename(file.path, finalSavePath, (err) => {
        if (err) {
            console.error("File move error:", err);
            return res.status(500).json({ error: 'Error saving the file.' });
        }

        // Respond with success message and dummy results data
        res.status(200).json({
            message: '✅ File uploaded successfully!',
            results: {
                total: 500,
                removedWrong: 100,
                removedSame: 100,
                lazyCrazy: 100,
                textNumbers: 100,
                active: 200,
            }
        });
    });
};