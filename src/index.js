const express = require('express');
const app = express();

// Configure port (default to 3000)
const PORT = process.env.PORT || 3000;

// Main endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'DevSecOps Lab API is running successfully',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Conditionally start server only when index.js is executed directly
let server;
if (require.main === module) {
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = { app, server };
