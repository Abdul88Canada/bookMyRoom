import express from 'express';
const router = express.Router();
import {
    createCity,
    getAllCities,
    getCityById,
    updateCity,
    deleteCity
} from '../controllers/cityController.js';

router.post('/', createCity); // Create a city
router.get('/', getAllCities); // Get all cities
router.get('/:id', getCityById); // Get city by ID
router.put('/:id', updateCity); // Update a city
router.delete('/:id', deleteCity); // Delete a city

export default router;
