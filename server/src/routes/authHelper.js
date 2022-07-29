import {fomoUsers} from '../database.js'
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
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
export async function register(username, password, societyName) {
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

    let user = {
        username: username,
        salt: salt,
        password: hashed,
        societies: []
    }

    await fomoUsers.insertOne(user);

    // Create token
    let token = jwt.sign({ username: username }, process.env.SUPER_SECRET_KEY, { expiresIn: '1h'});

    return {token: token};
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

    // Create token
    let token = jwt.sign({ username: user.username }, process.env.SUPER_SECRET_KEY, { expiresIn: '1h'});
    return {token: token};
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