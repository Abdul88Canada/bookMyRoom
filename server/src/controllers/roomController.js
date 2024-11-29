import Room from '../models/Room.js';

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
