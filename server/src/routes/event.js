import express from 'express'
import { getEvents } from './eventHelper.js'
import { fomoEvents } from '../database.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
const router = express.Router();

/*
Gets an event from the database

Example query:
/event/get?societyName=cse-soc
/fomoAddEvent?societyId=1

*/
router.get('/get', async (req, res) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); // Give access to front end server
    let items = await getEvents(req)
    console.log(req.username);
    if (items.length > 0) {
        res.status(200).send(items)
    } else {
        res.status(404).send({ error: 'Cannot find events with given parameters'})
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
router.post('/add', async (req, res) => {
    await fomoEvents.insertOne(req.body)
    res.status(200).send({ message : 'Success'})
})

/*
Deletes an event from the database

Body should contain the following structure:
{
    eventId: Integer,
}
*/
router.delete('/del', async (req, res) => {
    await fomoEvents.deleteOne({ eventId: req.body.eventId })
    res.status(200).send({ message: 'Success'})
})

export { router as default }