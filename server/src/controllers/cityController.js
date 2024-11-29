import City from '../models/City.js';

export const createCity = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'City name is required.' });
        }

        const cityExists = await City.findOne({ name });
        if (cityExists) {
            return res.status(400).json({ message: 'City already exists.' });
        }

        const city = new City({ name });
        await city.save();

        res.status(201).json({ message: 'City created successfully.', city });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const getAllCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const getCityById = async (req, res) => {
    try {
        const { id } = req.params;

        const city = await City.findById(id);
        if (!city) {
            return res.status(404).json({ message: 'City not found.' });
        }

        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const city = await City.findByIdAndUpdate(id, updates, { new: true });
        if (!city) {
            return res.status(404).json({ message: 'City not found.' });
        }

        res.status(200).json({ message: 'City updated successfully.', city });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

export const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;

        const city = await City.findByIdAndDelete(id);
        if (!city) {
            return res.status(404).json({ message: 'City not found.' });
        }

        res.status(200).json({ message: 'City deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};
