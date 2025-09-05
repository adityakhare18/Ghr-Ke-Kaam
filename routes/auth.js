import express from 'express';
import { showLogin, showRegister, login, register, logout } from '../controllers/authController.js';
import { body } from 'express-validator';

const router = express.Router();

const validateRegistration = [
  body('name')
    .notEmpty()
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
    .matches(/^[A-Za-z\s]+$/).withMessage('Name must contain only letters and spaces'),

  body('email')
    .isEmail().withMessage('Enter a valid email address'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('phone')
    .optional({ checkFalsy: true })
    .isLength({ min: 10, max: 10 }).withMessage('Phone number must be exactly 10 digits')
    .isNumeric().withMessage('Phone number must contain only numbers'),
];


const validateLogin = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];

router.get('/login', showLogin);
router.get('/register', showRegister);

router.post('/login',validateLogin, login);

router.post('/register',validateRegistration, register);

router.get('/logout', logout);

export default router;
