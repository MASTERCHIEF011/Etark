import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes.js'
import homeRoutes from './routes/homeRoutes.js'

dotenv.config();
const app = express();


app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());


mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to Database'))
    .catch((error) => console.log(error.message));


app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(authRoutes)
app.use(homeRoutes)

export default app