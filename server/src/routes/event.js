import express from 'express'
import { getEvents } from './eventHelper.js'
import { fomoEvents, fomoSocieties } from '../database.js';
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
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); // Give access to front end server
    let items = await getEvents(req)
    console.log(req.username);
    if (items.length > 0) {
        res.status(200).send(items)
    } else {
        res.status(404).send({ error: 'Cannot find events with given parameters'})
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
    eventId : String,
    societyId : Integer,
    eventName : String,
    date : Integer,
    description : String,
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
    let newEvent = req.body
    newEvent.societyName = foundSociety[0].societyName
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
    eventId: Integer,
}
*/
router.delete('/del', async (req, res, next) => {
    try {
    await fomoEvents.deleteOne({ eventId: req.body.eventId })
    res.status(200).send({ message: 'Success'})
    } catch(err) {
        next(err);
    }
})

export { router as default }