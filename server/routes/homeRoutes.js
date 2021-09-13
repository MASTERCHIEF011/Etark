import express from 'express';

import { home } from '../controllers/home.js'
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/home', auth, home);
router.get('/', (req, res) => {
    res.send("hello uuu")
    console.log("etarkisworkingss")
})

export default router;