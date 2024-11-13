const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB
mongoose.connect(MONGODB_API_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to the database');
}).catch((error) => {
  console.error('Database connection error:', error);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`SRV c-assmat-aio sur port ${PORT}`);
});
