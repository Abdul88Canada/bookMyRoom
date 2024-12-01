import express from 'express';
const router = express.Router();
import {
    createLocation,
    getAllLocations,
    getLocationById,
    updateLocation,
    deleteLocation
} from '../controllers/locationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.use(authMiddleware);

router.post('/', createLocation); // Create a location
router.get('/', getAllLocations); // Get all locations
router.get('/:id', getLocationById); // Get location by ID
router.put('/:id', updateLocation); // Update a location
router.delete('/:id', deleteLocation); // Delete a location

export default router;
