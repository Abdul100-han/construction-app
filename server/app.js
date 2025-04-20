const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

// ✅ Load environment variables
dotenv.config({ path: './config/config.env' });

// ✅ Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // only if using cookies/auth headers
}));

// ✅ Body parser middleware
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// ✅ Import routes
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');

// ✅ Mount routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/dashboard', dashboard);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
