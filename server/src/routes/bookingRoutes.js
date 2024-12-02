import express from 'express';
const router = express.Router();
import {
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingsByUser,
    getBookingsByRoom,
    updateBooking,
    cancelBooking,
    checkAvailability,
    getBookingsByDate,
    getBookingsForCompany
} from '../controllers/bookingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.use(authMiddleware);

router.post('/', createBooking); // Create a booking
router.get('/company', getBookingsForCompany);
router.get('/', getAllBookings); // Get all bookings
router.get('/:id', getBookingById); // Get booking by ID
router.get('/user/:userId', getBookingsByUser); // Get bookings by user
router.get('/room/:roomId', getBookingsByRoom); // Get bookings by room
router.put('/:id', updateBooking); // Update a booking
router.delete('/:id', cancelBooking); // Cancel a booking
router.get('/check', checkAvailability); // Check room availability
router.get('/date/:date', getBookingsByDate); // Get bookings by date

export default router;
