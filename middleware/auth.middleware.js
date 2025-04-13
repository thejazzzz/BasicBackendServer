import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js'; 

//someone is making a request to the server and we need to check if they are authorized to do so
import User from '../models/user.model.js'; // Import the User model

const authorize = async (req, res, next) => {
    try {
        let token ;
        if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user; // Attach the user to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' , error: error.message });
    }
}

export default authorize;