import express from 'express';
import {
    addCompany,
    getCompanies,
    getCompanyById,
    deleteCompany
} from '../controllers/adminController.js';
import { createRoom } from '../controllers/roomController.js';
import {getBookingsForCompanyAdmin} from '../controllers/bookingController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import { checkAdminMiddleware } from '../middleware/checkAdminMiddleware.js';

const router = express.Router();

// Apply both authentication and admin check middleware
router.use(authMiddleware);
router.use(checkAdminMiddleware);

// Add a new company
router.post('/company/add', addCompany);

// Get all companies
router.get('/company/', getCompanies);

// Get a company by ID
router.get('/company/:id', getCompanyById);

// Delete a company
router.delete('/company/:id', deleteCompany);

router.post('/rooms', createRoom);

router.get('/bookings/company', getBookingsForCompanyAdmin);

export default router;
