import express from 'express'
const router = express.Router();
import { register, login, resetPasswordReq, resetPasswordRes, generateAccessToken } from './authHelper.js'
import { fomoUsers } from '../database.js'
import jwt from 'jsonwebtoken'

/*
Creates a new user
Code borrowed from
https://learning-platform-six.vercel.app/articles/ppc-backend-4
NOTE: NOT SECURE
Body should contain the following structure:
{
    username: string,
    password: string
}
*/
router.post('/register', async (req, res, next) => {
    try {
        const tokens = await register(req.body.username, req.body.password, req.body.email);
        if (tokens.error !== undefined) {
            console.log(tokens.error)
            res.status(400).send({ error : tokens.error});
            return;
        }
        res.cookie('jwt', tokens.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true});
        res.status(200).send({ accessToken: tokens.accessToken });
    } catch (err) {
        next(err);
    }
})

/*
Given a valid username and password, returns an access token
Body should contain the following structure:
{
    username: string,
    password: string
}
*/ 
router.post('/login', async (req, res, next) => {
    try {
    const tokens = await login(req.body.username, req.body.password);
    if (tokens.error !== undefined) {
        res.status(400).send({ error: tokens.error});
        return;
    }
    console.log(tokens);
    //res.cookie('jwt', tokens.refreshToken, { httpOnly: true, origin: 'http://localhost', secure: true , maxAge: 24 * 60 * 60 * 1000});
    res.cookie('jwt', tokens.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true});
    res.status(200).send({ accessToken: tokens.accessToken });
    } catch (err) {
        next(err)
    }
});

/*
Given a refresh token, return an access token
*/
router.get('/refresh', async (req, res, next) => {
    try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUsers = await fomoUsers.find({ refreshToken: refreshToken }).toArray();
    if (foundUsers.length !== 1) return res.sendStatus(403); // Forbidden
    const foundUser = foundUsers[0]
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = generateAccessToken(decoded.username, foundUser._id.toString());
            res.json({ accessToken });
        }
    )
    } catch (err) {
        next(err);
    }
});

/*
Logout the user by disabling the refresh token
*/
router.get('/logout', async (req, res, next) => {
    try {
    // On client, delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content to send back (i.e success but there wasn't really a need to logout because there is no token)
    const refreshToken = cookies.jwt;
    const foundUsers = await fomoUsers.find({ refreshToken: refreshToken }).toArray();
    console.log(foundUsers);
    if (foundUsers.length !== 1) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    const foundUser = foundUsers[0]
    await fomoUsers.updateOne( { username: foundUser.username }, 
        {
            $set: {
                refreshToken: ''
            }
        }
    );

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
    } catch (err) {
        next(err)
    }
});

/*
Given a valid email, sends link to email to reset password
{
    email: string
}
*/ 
router.post('/resetpasswordreq', async (req, res, next) => {
    try {
        const token = await resetPasswordReq(req.body.email);
        if (token.error !== undefined) {
            res.status(400).send({ error: token.error });
            return;
        }
        console.log(token)
        res.status(200).send("SUCCESS");
        } catch (err) {
            next(err)
        }
});

/*
Given a token and password, if token hasn't expired update the corresponding user's password
{
    token: string
    password: string
}
*/ 
router.post('/resetpasswordres', async (req, res, next) => {
    try {
    const result = await resetPasswordRes(req.body.token, req.body.password);
    if (result.error !== undefined) {
        res.status(400).send({ error: result.error});
        return;
    }
    res.status(200).send("SUCCESS");
    } catch (err) {
        next(err)
    }
});

export { router as default}