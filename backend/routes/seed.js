import express from 'express'
import { seedController } from '../controllers/seedController.js'


const router = express.Router()

router.get('/', seedController)

export default router