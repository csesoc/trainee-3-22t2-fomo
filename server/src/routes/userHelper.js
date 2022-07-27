// Get collections from database
import {client, fomodb, fomoEvents, fomoSocieties, fomoUsers} from '../database.js'

/**
 * Returns all users in the database
 * @returns
 */
async function getUsers() {
    let users = await fomoUsers.find()
    return users;
}

export { getUsers }