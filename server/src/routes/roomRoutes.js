import express from 'express';
const router = express.Router();
import {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
} from '../controllers/roomController.js';

router.post('/', createRoom); // Create a room
router.get('/', getAllRooms); // Get all rooms
router.get('/:id', getRoomById); // Get room by ID
router.put('/:id', updateRoom); // Update a room
router.delete('/:id', deleteRoom); // Delete a room

export default router;
