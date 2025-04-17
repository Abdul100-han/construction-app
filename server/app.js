// ... (previous code)

// Route files
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');

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