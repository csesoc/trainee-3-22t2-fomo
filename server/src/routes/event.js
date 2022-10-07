import express from 'express'
import { getEvents } from './eventHelper.js'
import { fomoEvents, fomoSocieties, fomoUsers } from '../database.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { ObjectId } from 'mongodb';
const router = express.Router();

/*
Gets an event from the database

Example query:
/event/get?societyName=cse-soc
/fomoAddEvent?societyId=1

*/
router.get('/get', async (req, res, next) => {
    try {
    let items = await getEvents(req)
    console.log(req.username);
    if (items.length > 0) {
        res.status(200).send(items)
    } else {
        res.status(400).send({ error: 'Cannot find events with given parameters'})
    }
    } catch(err) {
        next(err);
    } 
})

router.use(verifyJWT);

/*
Adds an event to the database 
Body should contain the following structure:
{
    societyId: String,
    eventName : String,
    start: Integer,
    end: Integer,
    description : String,
    tags: String[],
}
NOTE: date is in Unix epoch time

*/
router.post('/add', async (req, res, next) => {
    try {
        // Check if societyId is valid
        let societyIdObj = ObjectId(req.body.societyId);
        let foundSociety = await fomoSocieties.find({ _id: societyIdObj }).toArray();
        if (foundSociety.length <= 0) {
            return res.status(400).send({ error : 'Invalid society id' });
        }
        // Check if user is a user of the society (can edit/add/remove events)
        // Bypassed if user has dev permissions
        let authUser = await fomoUsers.findOne({ _id: ObjectId(req.userId) });
        foundSociety = foundSociety[0]
        if (!foundSociety.users.includes(req.userId) && authUser.dev !== true) {
            return res.status(403).send({ error : 'Auth user is not a member of the society' });
        }
        let newEvent = req.body;
        // Add society color if color is not given
        if (newEvent.color === undefined) {
            newEvent.color = foundSociety.color;
        }
        // Add societyName to event
        newEvent.societyName = foundSociety.societyName;
        await fomoEvents.insertOne(req.body)
        res.status(200).send({ message : 'Success'})
    } catch(err) {
        next(err);
    }
})

/*
Deletes an event from the database

Body should contain the following structure:
{
    eventId: string,
}
*/
router.delete('/del', async (req, res, next) => {
    try {
    // Check if user is a user of the society (can edit/add/remove events)
    let events = await fomoEvents.find({ _id: ObjectId(eventId) }).toArray();
    let societyId = events[0].societyId
    let societies = await fomoSocieties.find({ _id: ObjectId(societyId) }).toArray();
    let foundSociety = societies[0]
    if (!foundSociety.users.includes(req.userId)) {
        return res.status(403).send({ error : 'Auth user is not a member of the society' });
    }
    await fomoEvents.deleteOne({ _id: ObjectId(eventId) });
    res.status(200).send({ message: 'Success'})
    } catch(err) {
        next(err);
    }
})

/*
Edits an event from the database

Body should contain the following structure:
{
    societyId: String,
    eventName : String,
    start: Integer,
    end: Integer,
    description : String,
    tags: String[],
}
*/
router.put('/edit', async (req, res, next) => {
    try {
        let events = await fomoEvents.find({ _id: ObjectId(eventId) }).toArray();
        let societyId = events[0].societyId
        let societies = await fomoSocieties.find({ _id: ObjectId(societyId) }).toArray();
        let foundSociety = societies[0]
        if (!foundSociety.users.includes(req.userId)) {
            return res.status(403).send({ error : 'Auth user is not a member of the society' });
        }
        
        await fomoEvents.updateOne({ _id: ObjectId(eventId) }, req.body);
        res.status(200).send({ message: 'Success'})
    } catch(err) {
        next(err);
    }
})



export { router as default }