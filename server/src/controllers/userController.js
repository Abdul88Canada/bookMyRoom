import User from '../models/User.js'; // Ensure the correct path to your User model

export const getUsersByCompanyId = async (req, res) => {
  try {
    // Retrieve the user's email from the token (added by authMiddleware)
    const userEmail = req.user.email;

    // Find the logged-in user's info
    const currentUser = await User.findOne({ email: userEmail });

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Fetch all users with the same companyId
    const companyId = currentUser.companyId;
    const users = await User.find({ companyId }).select("name email companyId");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching company users:", error);
    res.status(500).json({ message: "Server error." });
  }
};
