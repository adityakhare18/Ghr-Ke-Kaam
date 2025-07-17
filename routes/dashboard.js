import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { showDashboard, showProfile } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', authenticateToken, showDashboard);

router.get('/profile', authenticateToken, showProfile);

export default router;
