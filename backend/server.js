const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', uploadRoutes);
app.get('/', (req, res) => res.send('Backend is Running 🚀'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Backend server running on port ${PORT}`);
});