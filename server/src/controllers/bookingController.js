import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import Company from '../models/Company.js';

export const createBooking = async (req, res) => {
    try {
        const { roomId, date, slot } = req.body;
        const { name, email, companyId } = req.user;
        // Validate required fields
        if (!roomId || !date || !slot) {
            return res.status(400).json({
                message: 'roomId, date, and slot are required.',
            });
        }
        // Validate slot availability
        const existingBooking = await Booking.findOne({ room: roomId, date, slot });
        if (existingBooking) {
            return res.status(400).json({ message: 'Slot already booked.' });
        }
        const company = await Company.findOne({companyId});
        if (!company) {
            return res.status(400).json({ message: 'company issue.' });
        }
        // Create a new booking
        const booking = new Booking({
            room: roomId,
            user: req.user?._id, // Optional: Add user ID if authentication is used
            date,
            slot,
            name,
            email,
            company: company._id
        });

        // Save booking to the database
        await booking.save();

        res.status(201).json({ message: 'Booking created successfully.', booking });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};


// Additional CRUD operations for bookings can be added here.
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('room user');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};


export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id).populate('room user');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const getBookingsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const bookings = await Booking.find({ user: userId }).populate('room');
        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this user.' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const getBookingsByRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        const bookings = await Booking.find({ room: roomId }).populate('user');
        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this room.' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const booking = await Booking.findByIdAndUpdate(id, updates, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        res.status(200).json({ message: 'Booking updated successfully.', booking });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        res.status(200).json({ message: 'Booking canceled successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const checkAvailability = async (req, res) => {
    try {
        const { roomId, date, slot } = req.query;

        if (!roomId || !date || !slot) {
            return res.status(400).json({ message: 'roomId, date, and slot are required.' });
        }

        const booking = await Booking.findOne({ room: roomId, date, slot });
        if (booking) {
            return res.status(400).json({ message: 'Slot is already booked.' });
        }

        res.status(200).json({ message: 'Slot is available.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const getBookingsByDate = async (req, res) => {
    try {
        const { date } = req.params;

        const bookings = await Booking.find({ date }).populate('room user');
        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this date.' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const getBookingsForCompany = async (req, res) => {
    try {
        const { companyId } = req.user; // Assume companyId is in the user's token
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date are required.' });
        }
        const company = await Company.findOne({companyId});

        const bookings = await Booking.find({
            company: company._id,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        }).populate('room').populate({
            path: 'room',
            populate: {
                path: 'location', // Populate the location field of the room
                select: 'name', // Select only the name field from the location
            },
        });

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

export const getBookingsForCompanyAdmin = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date are required.' });
        }

        const bookings = await Booking.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        })
            .populate('room')
            .populate({
                path: 'room',
                populate: {
                    path: 'location', // Populate the location field of the room
                    select: 'name', // Select only the name field from the location
                },
            })
            .populate({
                path: 'company', // Populate the company field
                select: 'name', // Select only the name field from the company
            });

        // Map the response to include the company name
        const formattedBookings = bookings.map((booking) => ({
            _id: booking._id,
            date: booking.date,
            slot: booking.slot,
            room: {
                _id: booking.room._id,
                name: booking.room.name,
                location: booking.room.location.name,
            },
            company: booking.company ? booking.company.name : 'Unknown', // Include the company name
        }));

        res.status(200).json(formattedBookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};
