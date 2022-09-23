import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
/*
Checks for a bearer token and returns 200 if the token is valid
*/
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401); // Unauthorised error (no given token)
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.SUPER_SECRET_KEY,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Invalid token
            req.username = decoded.username;
            req.userId = decoded.userId;
            next();
        }
    )
}

export { verifyJWT }