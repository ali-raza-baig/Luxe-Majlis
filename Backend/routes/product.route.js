import express from 'express';
import {
    createProduct, deleteProduct,
    getByQuery, getSingle,
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
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct)

export default router;