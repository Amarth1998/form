import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Protected routes: token-based authentication middleware
export const requireSignIn = async (req, res, next) => {
    try {
        
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET); // Verify the JWT token from the Authorization header
        
        // Assign the decoded user information to req.user
        req.user = decode; 
        
        next();// Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);
        // If there's an error (e.g., invalid token), respond with a 401 Unauthorized status
        res.status(401).send({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

// Admin access control middleware
// This checks if the authenticated user is an admin
export const isAdmin = async (req, res, next) => {
    try {
        // Find the user by their ID from the database
        const user = await userModel.findById(req.user._id); // Corrected method name
        
        // Check if the user's role is 1 (admin)
        if (user.role !== 1) {
            // If the user is not an admin, respond with a 401 Unauthorized status
            return res.status(401).send({
                success: false,
                message: "Unauthorized access",
            });
        }
        
        next();// If the user is an admin, proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);
        // Handle any errors that occur while checking the user's role
        res.status(401).send({
            success: false,
            message: "Unauthorized access",
        });
    }
};
