import Admin from '../models/Admin.js'; // Import your User model

export const checkAdminMiddleware = async (req, res, next) => {
    try {
        // Assuming `req.user` is set by the `authMiddleware` after validating the token
        const { email } = req.user; // Get the user's email from the request

        // Find the user in the database by email
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user's accountType is 'CM_ADMIN'
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden: Admins only' });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in checkAdminMiddleware:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
