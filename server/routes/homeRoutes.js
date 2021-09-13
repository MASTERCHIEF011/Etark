import express from 'express';

import { home } from '../controllers/home.js'
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/home', auth, home);
router.get('/', () => {
    res.status(200).send("Etark")
})

export default router;