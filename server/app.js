const express = require('express')
const app = express()
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config({ path: './config/config.env' });

// dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI); // Add this


// Body parser middleware
app.use(express.json());


// Route files
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/dashboard', dashboard);

// Error handling middleware (add at the end)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));