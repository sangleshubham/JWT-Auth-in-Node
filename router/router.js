import { Router } from "express";
import { getHomepage, getLogin, getSignup, getSmoothies, postLogin, postSignup } from "../controller/controller.js";

const router = Router()


router.get('/' , getHomepage)
router.get('/smoothies' , getSmoothies)

router.post('/signup' , postSignup) 
router.get('/signup' , getSignup) // gives back signupview
router.get('/login' , getLogin)
router.post('/login' , postLogin)

export default router



