import express from 'express';
import { loginController, registerController } from '../controllers/auth.controller.js';
import { isVerified } from '../middlewares/verified.middleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/verify', isVerified, (req, res) => {
    try {
        res.status(200).send({
            success: true,
            ok: true
        })
    } catch (error) {
        console.log(error)
    }
})


export default router;