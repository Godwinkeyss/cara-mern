import express from 'express';
import { signin,signUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup',signUp)
export default router;
