import express from 'express'
const router = express.Router();
import { register, login } from './authHelper.js'
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
router.post('/register', async (req, res) => {
    const output = await register(req.body.username, req.body.password);
    if (output.error !== undefined) {
        res.status(400).send({ error : output.error});
        return;
    }
    console.log(output);
    res.status(200).send({ token: output.token });
})

/*
Given a valid username and password, returns an access token
Body should contain the following structure:
{
    username: string,
    password: string
}
*/
router.post('/login', async (req, res) => {
    const output = await login(req.body.username, req.body.password);
    if (output.error !== undefined) {
        res.status(400).send({ error: output.error});
        return;
    }
    console.log(output);
    res.status(200).send({ token: output.token});
})

export { router as default}