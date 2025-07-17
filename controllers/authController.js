import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const showLogin = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        error: null,
        formData: {} 
    });
};

export const showRegister = (req, res) => {
    res.render('auth/register', {
        title: 'Register',
        error: null,
        formData: {}  
    });
};


export const register = async (req, res) => {
    try {
        const { name, email, password, userType, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('auth/register', {
                title: 'Register',
                error: 'User already exists',
                formData: req.body
            });
        }

        const userData = {
            name,
            email,
            password,
            userType,
        };

        if (userType === 'service_provider') {
            userData.phone = phone;
        }

        const user = new User(userData);
        await user.save(); 

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.render('auth/register', {
            title: 'Register',
            error: 'Registration failed. Please try again.',
            formData: req.body
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('auth/login', {
                title: 'Login',
                error: 'Invalid credentials',
                formData: { email }  
            });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        

        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.render('auth/login', {
            title: 'Login',
            error: 'Login failed. Please try again.',
            formData: { email: req.body.email || '' }  
        });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
};
