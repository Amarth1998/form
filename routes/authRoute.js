import express from 'express'
import {registerController ,loginController ,testController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from '../middlewares/authmiddleware.js'

//router object

const router =express.Router()


//Resgister 
router.post('/register',registerController )
router.post('/login',loginController )
router.get('/test',requireSignIn,isAdmin,testController )



export default router 