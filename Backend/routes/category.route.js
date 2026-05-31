import express from 'express';
import { createCategory, getAllCategory, getSingleCategory } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/create', createCategory);
router.get('/all', getAllCategory);
router.get('/single/:slug', getSingleCategory);

export default router;