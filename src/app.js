const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./configuration/db_config')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
connectDB();

// Routes
app.use('/api/services', require('./routes/authRoutes'));

// Homepage route (accessible in the browser)
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Authentication Service!</h1><p>Use the /api/auth/register and /api/auth/login routes to register and login users.</p>');
});

app.listen(PORT, () => console.log(`Authentication service running on port ${PORT}`));
