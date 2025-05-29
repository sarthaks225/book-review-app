
require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
app.use(express.json());

app.use('/signup', authRoutes);
app.use('/login', authRoutes);
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
