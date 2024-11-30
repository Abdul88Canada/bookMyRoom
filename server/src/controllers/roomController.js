import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

export const createRoom = async (req, res) => {
    try {
        const { name, locationId, capacity, amenities, availableSlots } = req.body;

        if (!name || !locationId || !capacity) {
            return res.status(400).json({ message: 'Name, locationId, and capacity are required.' });
        }

        const room = new Room({ name, location: locationId, capacity, amenities, availableSlots });
        await room.save();

        res.status(201).json({ message: 'Room created successfully.', room });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
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

        console.log(`Fetching rooms for location: ${locationId}`);
        const rooms = await Room.find({ location: locationId });

        if (!rooms || rooms.length === 0) {
            console.log(`No rooms found for location: ${locationId}`);
            return res.status(404).json({ message: "No rooms found for this location." });
        }

        console.log(`Found ${rooms.length} rooms for location: ${locationId}`);

        // Fetch all bookings for the rooms
        const roomIds = rooms.map((room) => room._id);
        console.log(`Room IDs: ${roomIds}`);

        const bookings = await Booking.find({
            room: { $in: roomIds },
        });

        console.log(`Found ${bookings.length} bookings for these rooms.`);
        console.log("Bookings:", bookings);

        // Create a dictionary of booked slots by room and weekday
        const bookedSlotsByRoomAndWeekday = {};
        bookings.forEach((booking) => {
            const roomId = booking.room.toString();
            const bookingDate = new Date(booking.date);
            const weekday = bookingDate.toLocaleDateString("en-US", { weekday: "long" }); // e.g., "Wednesday"
            const key = `${roomId}-${weekday}`;

            if (!bookedSlotsByRoomAndWeekday[key]) {
                bookedSlotsByRoomAndWeekday[key] = [];
            }
            bookedSlotsByRoomAndWeekday[key].push(booking.slot);
        });

        console.log("Booked Slots by Room and Weekday:", bookedSlotsByRoomAndWeekday);

        // Filter available slots for each room
        const roomsWithAvailableSlots = rooms.map((room) => {
            console.log(`Processing room: ${room.name}`);

            const updatedAvailableSlots = room.availableSlots.map((slotGroup) => {
                const key = `${room._id}-${slotGroup.day}`;
                const bookedSlots = bookedSlotsByRoomAndWeekday[key] || [];
                console.log(`Booked slots for key ${key}:`, bookedSlots);

                // Filter out booked slots
                const availableSlots = slotGroup.slots.filter(
                    (slot) => !bookedSlots.includes(slot)
                );

                console.log(`Available slots for day ${slotGroup.day}:`, availableSlots);

                return {
                    day: slotGroup.day,
                    slots: availableSlots,
                };
            });

            return {
                ...room._doc,
                availableSlots: updatedAvailableSlots,
            };
        });

        console.log("Final processed rooms with available slots:", roomsWithAvailableSlots);

        res.status(200).json(roomsWithAvailableSlots);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error.", error });
    }
};




