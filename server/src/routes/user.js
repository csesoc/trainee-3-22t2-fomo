import express from 'express'
import { fomoUsers } from '../database.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
const router = express.Router();

router.use(verifyJWT);

/*
Given a refresh token, returns username of current logged in user
*/
router.get('/get', async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); // no refresh token
    const refreshToken = cookies.jwt;
    const foundUsers = await fomoUsers.find({ refreshToken: refreshToken }).toArray();
    if (foundUsers.length !== 1) return res.sendStatus(403); // Forbidden
    const foundUser = foundUsers[0]
    console.log(foundUser);
    res.json({ user: foundUser })
});

export { router as default}