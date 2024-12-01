import express  from "express";
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

import roomRoutes from './routes/roomRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
app.use(express.json()); // for parsing application/json
const corsOptions = {
  origin: ['https://cmass-deu3.onrender.com', 'http://localhost:3000', 'https://c-mass.co', 'null'], // Array of allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Authorization, Content-Type',
  credentials: true,
};

app.use(cors(corsOptions));

// Route middleware
app.use('/api/rooms', roomRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));