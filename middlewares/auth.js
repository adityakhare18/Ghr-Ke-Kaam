import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.redirect('/auth/login');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            res.clearCookie('token');
            return res.redirect('/auth/login');
        }

        req.userId = user._id;
        req.user = user;
        next();
        
    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/auth/login');
    }
};

export const requireCustomer = (req, res, next) => {
    if (req.user.userType !== 'customer') {
        return res.redirect('/dashboard');
    }
    next();
};

export const requireServiceProvider = (req, res, next) => {
    if (req.user.userType !== 'service_provider') {
        return res.redirect('/dashboard');
    }
    next();
};

