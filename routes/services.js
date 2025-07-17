import express from 'express';
import { authenticateToken, requireServiceProvider } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';
import {
    getAllServices,
    showCreateForm,
    createService,
    getService,
    showEditForm,
    updateService,
    deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', authenticateToken, getAllServices);
router.get('/create', authenticateToken, requireServiceProvider, showCreateForm);
router.post('/create', authenticateToken, requireServiceProvider, upload.single('photo'), createService);
router.get('/:id', authenticateToken, getService);
router.get('/:id/edit', authenticateToken, requireServiceProvider, showEditForm);
router.post('/:id/edit', authenticateToken, requireServiceProvider, upload.single('photo'), updateService);
router.post('/:id/delete', authenticateToken, requireServiceProvider, deleteService);

export default router;
