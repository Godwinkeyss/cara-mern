import express from 'express'
import { createProduct, getAllProduct,getCategories,getSingleProduct,getSingleProductById,search } from '../controllers/productController.js'

const router = express.Router()


router.post('/',createProduct)
router.get('/', getAllProduct)
router.get('/categories', getCategories)
router.get('/search',search );
router.get('/:slug', getSingleProduct)
router.get('/id/:id', getSingleProductById)



export default router;