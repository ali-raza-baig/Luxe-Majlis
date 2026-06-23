import express from 'express';
import {
    createProduct, deleteProduct,
    getByQuery, getSingle,
    getSingleById,
    updateProduct
} from '../controllers/product.controller.js';
import upload from '../config/multer.config.js';

const router = express.Router();

router.post('/create', upload.fields([
    { name: 'futureImage', maxCount: 1 },
    { name: 'imageGallery', maxCount: 10 }
]), createProduct);
router.get('/all', getByQuery);
router.get('/single/:slug', getSingle);
router.get('/single-by-id/:id', getSingleById);
router.put('/update/:id', upload.fields([
    { name: 'futureImage', maxCount: 1 },
    { name: 'imageGallery', maxCount: 10 }
]), updateProduct);
router.delete('/delete/:id', deleteProduct)

export default router;