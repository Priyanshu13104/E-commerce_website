import express from "express";
import {registerUser, loginUser} from "../controllers/authController.js"

const router = express.Router();


router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', registerUser);

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login', loginUser);
export default router;