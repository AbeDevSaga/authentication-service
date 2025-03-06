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
app.use('/api/services', require('./routes/serviceRoutes'));

// Homepage route (accessible in the browser)
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Service!</h1><p>Use the /api/service/register and /api/service/login routes to register and login users.</p>');
});

app.listen(PORT, () => console.log(`Authentication service running on port ${PORT}`));
