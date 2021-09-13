import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }
    try {
        let decodedPayload;

        decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedPayload?.id;

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid Token." });
    }
}

export default auth;