import express from 'express';
import { createMessage, getMessage } from '../controllers/consultation.controller.js';

const router = express.Router();

router.post('/send', createMessage);
router.get('/get', getMessage);

export default router;