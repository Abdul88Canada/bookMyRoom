import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // Ensure correct path
import { getUsersByCompanyId } from '../controllers/userController.js'; // Ensure correct path

const router = express.Router();

router.use(authMiddleware);

// Fetch all users in the same company (Protected route)
router.get('/company', getUsersByCompanyId);

export default router;
