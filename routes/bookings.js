import express from 'express';
import { authenticateToken, requireCustomer } from '../middlewares/auth.js';
import { showCreateForm, createBooking, getBookings, acceptBooking, rejectBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/create', authenticateToken, requireCustomer, showCreateForm);
router.post('/create', authenticateToken, requireCustomer, createBooking);
router.get('/', authenticateToken, getBookings);

export default router;

