import express from 'express'
import {profile} from '../controllers/userController.js'
import {isAuth} from '../utils/getToken.js'

const router = express.Router()

router.put('/profile', isAuth, profile )


export default router