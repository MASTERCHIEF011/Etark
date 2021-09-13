import express from 'express';

import { home } from '../controllers/home.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/home', auth, home);

export default router;