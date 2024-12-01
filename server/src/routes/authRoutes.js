import express from 'express';
import { adminSignup, adminLogin, userSignup, userLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);
router.post('/user/signup', userSignup);
router.post('/user/login', userLogin);

export default router;
