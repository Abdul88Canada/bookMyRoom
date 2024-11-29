import Location from '../models/Location.js';

export const createLocation = async (req, res) => {
    try {
        const { name, cityId } = req.body;

        if (!name || !cityId) {
            return res.status(400).json({ message: 'Name and cityId are required.' });
        }

        const location = new Location({ name, city: cityId });
        await location.save();

        res.status(201).json({ message: 'Location created successfully.', location });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find().populate('city');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const getLocationById = async (req, res) => {
    try {
        const { id } = req.params;

        const location = await Location.findById(id).populate('city');
        if (!location) {
            return res.status(404).json({ message: 'Location not found.' });
        }

        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const location = await Location.findByIdAndUpdate(id, updates, { new: true });
        if (!location) {
            return res.status(404).json({ message: 'Location not found.' });
        }

        res.status(200).json({ message: 'Location updated successfully.', location });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const deleteLocation = async (req, res) => {
    try {
        const { id } = req.params;

        const location = await Location.findByIdAndDelete(id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found.' });
        }

        res.status(200).json({ message: 'Location deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};
