import {client, fomodb, fomoEvents, fomoSocieties} from './database.js'

import { findSocietyIdbyName } from './society.js';


/**
 * Finds events given specifc parameters in request
 * 
 * Parameters include:
 * societyName: String
 * societyId: Integer
 * 
 * @param {*} req 
 * @returns
 */
export async function getEvents(req) {
    let query = {}
    let found = false
    if (req.query.societyName) {
        let societyId = await findSocietyIdbyName(req.query.societyName);
        if (societyId) {
            found = true
            query.societyId = societyId
        }
    } else if (req.query.societyId) {
        query.societyId = parseInt(req.query.societyId)
        found = true
    }
    if (found) {
        let items = await fomoEvents.find(query).toArray()
        return items
    }
    return []
}