
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const bookingRoutes = require('./routes/bookingRoutes');
const lapanganRoutes = require('./routes/lapanganRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware global ----------
app.use(logger);
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// ---------- Route dasar ----------
app.get('/', (req, res) => {
    res.json({
        message: 'RESTful API Booking Lapangan berjalan!'
    });
});

// ---------- Route booking ----------
app.use('/field-bookings', bookingRoutes);

// ---------- Route lapangan ----------
app.use('/lapangan', lapanganRoutes);

// ---------- Handler 404 dan error handler ----------
app.use(notFoundHandler);
app.use(errorHandler);

// ---------- Koneksi MongoDB ----------
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('MongoDB berhasil terhubung!');

        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Koneksi MongoDB gagal:', err.message);
    });

