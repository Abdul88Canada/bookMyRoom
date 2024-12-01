import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

export const adminSignup = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, name } = req.body;

      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(409).json({ message: 'Admin already exists with this email.' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const admin = new Admin({
        email,
        passwordHash: hashedPassword,
        name
      });

      await admin.save();

      const token = jwt.sign(
        { email: admin.email, id: admin._id, role: admin.role },
        process.env.JWT,
        { expiresIn: "30d" }
      );

      res.status(201).json({ admin: { id: admin._id, email: admin.email, role: admin.role, status: admin.status, name: admin.name }, token });
    } catch (error) {
      console.error('Something went wrong during admin signup.', error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }
];

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found." });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, admin.passwordHash);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials." });
      }
  
      const token = jwt.sign(
        { email: admin.email, id: admin._id, role: admin.role },
        process.env.JWT,
        { expiresIn: "30d" }
      );
  
      res.status(200).json({ admin: { id: admin._id, email: admin.email, role: admin.role }, token });
    } catch (error) {
      console.error('Something went wrong during admin login.', error);
      res.status(500).json({ message: "Something went wrong." });
    }
  };
  