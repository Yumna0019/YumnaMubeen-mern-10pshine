const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/authRoutes');
const pino = require('pino-http')();

dotenv.config();
const app = express();

connectDB();
app.use(pino);
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => res.send('Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;