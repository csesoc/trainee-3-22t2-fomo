import {fomoUsers, fomoResetTokens} from '../database.js'
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/emails/sendEmail.js';
import dotenv from 'dotenv';
dotenv.config();
/**
 * Adds a user with the given username and password
 * to the database
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
export async function register(username, password, email) {
    // Check for missing parameters
    if (!username || !password) {
        return { error: 'username or password is missing!'}
    }

    // Check if this user already exists
    let exists = await fomoUsers.findOne({ username: username });
    if (exists) {
        return { error: 'username is taken!'}
    }

    // Get salt
    let salt = crypto.randomBytes(16).toString('hex');

    // Initialise hash object
    let hash = crypto.createHmac('sha512', salt);

    // Combine password into hash
    hash.update(password);

    // Convert hash object to string
    let hashed = hash.digest('hex');

    const refreshToken = jwt.sign({ username: username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    let user = {
        username: username,
        salt: salt,
        password: hashed,
        refreshToken: refreshToken,
        societies: [],
        tags: []
    }

    if (email !== undefined) {
        user.email = email;
    }

    await fomoUsers.insertOne(user);
    // Create token
    let accessToken = jwt.sign({ username: username }, process.env.SUPER_SECRET_KEY, { expiresIn: '1h'});

    return {accessToken: accessToken, refreshToken: refreshToken};
}
/**
 * Returns a token when given a valid username and password
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
export async function login(username, password) {
    // Check for missing parameters
    if (!username || !password) {
        return {error : 'username or password is missing!'};
    }

    // Check if user exists
    let user = await fomoUsers.findOne({ username: username });
    if (!user) {
        return {error: 'user not found!'};
    }

    // Get salt
    let salt = user.salt

    // Initialise hash object
    let hash = crypto.createHmac('sha512', salt)

    // Combine password into hash
    hash.update(password)

    // Convert hash object to string
    let hashed = hash.digest('hex');

    if (hashed != user.password) {
        return {error: 'Incorrect password!'};
    }

    // Create tokens
    const accessToken = jwt.sign({ username: user.username }, process.env.SUPER_SECRET_KEY, { expiresIn: '30s'});
    const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    
    await fomoUsers.updateOne({ username: user.username },
        {
            $set: {
                refreshToken: refreshToken
            }
        });
    return {accessToken, refreshToken};
}

export async function resetPasswordReq(email) {
    // Check for missing parameters
    if (!email) {
        return {error : 'email is missing!'};
    }

    // Check if user exists
    let user = await fomoUsers.findOne({ email: email });
    if (!user) {
        return {error: 'user not found!'};
    }

    // delete existing token if any
    let curtoken = await fomoResetTokens.findOne({ email: email });
    if (curtoken) {
        await fomoResetTokens.deleteOne(curtoken);
    }

    // produce reset token
    let hash = crypto.createHmac('sha512', process.env.RESET_TOKEN_SECRET)
    let resetToken = crypto.randomBytes(32).toString("hex");
    hash.update(resetToken);
    let hashed = hash.digest('hex');
    
    await fomoResetTokens.insertOne({
        createdAt: new Date(),
        email: email,
        token: hashed
    });

    const link = `http:///localhost:5000/resetpasswordres?token=${resetToken}`;
    console.log(sendEmail(email, "Password Reset", { link: link }, "./templates/resetPassword.handlebars").then(result => console.log(result)));

    return resetToken;
}

export async function resetPasswordRes(token, password) {
    // Hash given token first
    let hash = crypto.createHmac('sha512', process.env.RESET_TOKEN_SECRET);
    hash.update(token);
    let hashed = hash.digest('hex');

    // Check if resetToken still valid
    let user = await fomoResetTokens.findOne({ token: hashed });
    if (!user) {
        return {error: 'Invalid Token / Token has expired'};
    }

    // hash password
    let passwordSalt = crypto.randomBytes(16).toString('hex');
    let passwordHash = crypto.createHmac('sha512', salt);
    passwordHash.update(password);
    let passwordHashed = passwordHash.digest('hex');

    await fomoUsers.updateOne(
        { email: user.email },
        { $set: { password: passwordHashed }}
    )
}


/**
 * Checks if the token is for a valid user
 * @param {string} token 
 * @return TODO: Standardise what is returned
 */
export function validateToken(token) {
    let decoded = {}
    try {
        decoded = jwt.verify(token, process.env.SUPER_SECRET_KEY)
    } catch (error) {
        return {error : 'token invalid or expired!'};
    }
    return { decoded };
};