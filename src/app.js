const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('InfraPulse API Running');
});

// Routes will be registered here
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);

module.exports = app;