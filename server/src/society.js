// Setup database
import {client, fomodb, fomoEvents, fomoSocieties} from './database.js'

async function findSocietyIdbyName(societyName) {
    let society = await fomoSocieties.find({ societyName: societyName}).toArray()
    if (society.length > 0) {
        return society[0].societyId
    } else {
        return undefined
    }
}

export { findSocietyIdbyName }