import express from 'express'
import { createProduct, getAllProduct,getSingleProduct,getSingleProductById } from '../controllers/productController.js'

const router = express.Router()


router.post('/',createProduct)
router.get('/', getAllProduct)
router.get('/:slug', getSingleProduct)
router.get('/id/:id', getSingleProductById)


export default router;