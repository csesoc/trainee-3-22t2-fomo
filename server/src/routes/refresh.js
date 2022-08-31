import express from 'express'
import { fomoUsers } from '../database.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
    const cookies = req.cookies;
    console.log('got the cookies', cookies);
    if (!cookies?.jwt) return res.status(401).send({error: 'No cookie'});
    const refreshToken = cookies.jwt;
    console.log(refreshToken);
    const foundUsers = await fomoUsers.find({ refreshToken: refreshToken }).toArray();
    if (foundUsers.length !== 1) return res.sendStatus(403); // Forbidden
    const foundUser = foundUsers[0]
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { username: decoded.username },
                process.env.SUPER_SECRET_KEY,
                { expiresIn: '30s' }
            );
            res.json({ accessToken });
        }
    )
    } catch (err) {
        next(err);
    }
});

export { router as default }