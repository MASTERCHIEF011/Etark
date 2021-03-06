import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from "../models/user.js"

export const signup = async (req, res) => {
    let { email, password, confirmPassword, name } = req.body;
    try {
        email = email.toLowerCase()
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exist!" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match! " });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: name });

        return res.status(200).json({ result });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" })
    }

}

export const signin = async (req, res) => {
    let { email, password } = req.body;
    try {
        email = email.toLowerCase()
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ result: existingUser, token });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" })
    }
}