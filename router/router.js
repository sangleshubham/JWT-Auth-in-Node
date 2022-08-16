import { Router } from "express";
import { getHomepage, getLogin, getSignup, getSmoothies, postLogin, postSignup } from "../controller/controller.js";
import autheticationChecker from '../middleware/middleware.js'
const router = Router()


router.get('/' , autheticationChecker , getHomepage)
router.get('/smoothies',autheticationChecker , getSmoothies)

router.post('/signup' , postSignup) 
router.get('/signup' , getSignup) // gives back signupview
router.get('/login' , getLogin)
router.post('/login' , postLogin)

export default router



