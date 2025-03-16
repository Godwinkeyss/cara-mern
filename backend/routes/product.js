import express from 'express';
import {
  createProduct,
  getAllProduct,
  getCategories,
  getSingleProduct,
  getSingleProductById,
  search,
  getAdminProduct,
} from '../controllers/productController.js';
import { isAdmin, isAuth } from '../utils/getToken.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProduct);
router.get('/categories', getCategories);
router.get('/search', search);
router.get('/admin', isAuth, isAdmin, getAdminProduct);
router.get('/:slug', getSingleProduct);
router.get('/id/:id', getSingleProductById);

export default router;
