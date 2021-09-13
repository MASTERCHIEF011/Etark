import express from 'express';
import multer from 'multer'

import { signin, signup } from '../controllers/user.js'

const router = express.Router();
const upload = multer()

router.post('/signin', upload.none(), signin);
router.post('/signup', upload.none(), signup);

export default router;