import Room from '../models/Room.js';
import Booking from '../models/Booking.js';


export const createRoom = async (req, res) => {
    try {
        const { name, location, capacity, amenities, availableSlots } = req.body;

        if (!name || !location || !capacity) {
            return res.status(400).json({ message: "Required fields are missing." });
        }

        const room = new Room({
            name,
            location,
            capacity,
            amenities,
            availableSlots,
        });

        await room.save();
        res.status(201).json({ message: "Room created successfully.", room });
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ message: "Server error.", error });
    }
};

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;

        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found.' });
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const room = await Room.findByIdAndUpdate(id, updates, { new: true });
        if (!room) {
            return res.status(404).json({ message: 'Room not found.' });
        }

        res.status(200).json({ message: 'Room updated successfully.', room });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;

        const room = await Room.findByIdAndDelete(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found.' });
        }

        res.status(200).json({ message: 'Room deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const getRoomsByLocationId = async (req, res) => {
    try {
        const { locationId } = req.params;

        if (!locationId) {
            console.log("Location ID is missing.");
            return res.status(400).json({ message: "Location ID is required." });
        }

        const rooms = await Room.find({ location: locationId }).populate('location');

        if (!rooms || rooms.length === 0) {
            console.log(`No rooms found for location: ${locationId}`);
            return res.status(404).json({ message: "No rooms found for this location." });
        }

        // Fetch all bookings for the rooms
        const roomIds = rooms.map((room) => room._id);

        const bookings = await Booking.find({
            room: { $in: roomIds },
        });

        // Create a dictionary of booked slots by room, weekday, and date
        const bookedSlotsByRoomAndDate = {};
        bookings.forEach((booking) => {
            const roomId = booking.room.toString();
            const bookingDate = new Date(booking.date).toISOString().split('T')[0]; // Normalize date
            const key = `${roomId}-${bookingDate}`;

            if (!bookedSlotsByRoomAndDate[key]) {
                bookedSlotsByRoomAndDate[key] = [];
            }
            bookedSlotsByRoomAndDate[key].push(booking.slot);
        });

        // Filter available slots for each room
        const roomsWithAvailableSlots = rooms.map((room) => {
            const updatedAvailableSlots = room.availableSlots.map((slotGroup) => {
                const today = new Date(); // Current date
                const slotDay = slotGroup.day;

                // Generate all dates matching the slot day in the future
                const datesMatchingDay = [];
                for (let i = 0; i < 30; i++) { // Check for the next 30 days
                    const futureDate = new Date(today);
                    futureDate.setDate(today.getDate() + i);
                    const weekday = futureDate.toLocaleDateString("en-US", { weekday: "long" });
                    if (weekday === slotDay) {
                        datesMatchingDay.push(futureDate.toISOString().split('T')[0]);
                    }
                }

                const availableSlotsForGroup = datesMatchingDay.map((matchingDate) => {
                    const key = `${room._id}-${matchingDate}`;
                    const bookedSlots = bookedSlotsByRoomAndDate[key] || [];

                    // Filter out booked slots for this specific date
                    const availableSlots = slotGroup.slots.filter(
                        (slot) => !bookedSlots.includes(slot)
                    );

                    return {
                        date: matchingDate,
                        slots: availableSlots,
                    };
                });

                return {
                    day: slotGroup.day,
                    slotsByDate: availableSlotsForGroup,
                };
            });

            return {
                ...room._doc,
                availableSlots: updatedAvailableSlots,
            };
        });
        res.status(200).json(roomsWithAvailableSlots);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error.", error });
    }
};





