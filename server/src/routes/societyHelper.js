// Get collections from database
import {client, fomodb, fomoEvents, fomoSocieties} from '../database.js'

/**
 * Finds a society's id given their name
 * Returns undefinedd if no id is found
 * 
 * @param {String} societyName 
 * @returns 
 */
async function findSocietyIdbyName(societyName) {
    let society = await fomoSocieties.find({ societyName: societyName}).toArray()
    if (society.length > 0) {
        return society[0].societyId
    } else {
        return undefined
    }
}

export { findSocietyIdbyName }