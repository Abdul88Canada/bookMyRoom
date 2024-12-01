import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Extract the token from the 'Authorization' header (expecting 'Bearer <token>')
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing.' });
  }

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.JWT);

    // Attach the decoded token to the request object for later use
    req.user = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error('JWT verification failed:', error);

    // Return an appropriate error message
    return res.status(401).json({ message: 'Invalid or expired authentication token.' });
  }
};

export default authMiddleware;

