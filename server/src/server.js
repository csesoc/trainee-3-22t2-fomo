console.log("notangles but better hahaha sorry ray get good");

import express from 'express';

import { getEvents } from './events.js'

// Setup database
import {client, fomodb, fomoEvents, fomoSocieties} from './database.js'

// Setup app
const app = express()
var router = express.Router()
app.use(express.json())
app.use('/', router)

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
router.post('/fomoAddEvent', async (req, res) => {
    await fomoEvents.insertOne(req.body)
    res.status(200).send({ message : 'Success'})
})

/*
Gets an event from the database

Example query:
/fomoAddEvent?societyName=cse-soc
/fomoAddEvent?societyId=1

*/
router.get('/fomoGetEvents', async (req, res) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); // Give access to front end server
    let items = await getEvents(req)
    if (items.length > 0) {
        res.status(200).send(items)
    } else {
        res.status(404).send({ error: 'Cannot find events with given parameters'})
    }
})

/*
Deletes an event from the database

Body should contain the following structure:
{
    eventId: Integer,
}
*/
router.delete('/fomoDelEvent', async (req, res) => {
    await fomoEvents.deleteOne({ eventId: req.body.eventId })
    res.status(200).send({ message: 'Success'})
})

/*
Adds a society to the database 
Body should contain the following structure:
{
    societyId : Integer,
    societyName : String,
    username : String,
    password : String,
}
*/
router.post('/fomoAddSociety', async (req, res) => {
    await fomoSocieties.insertOne(req.body)
    res.status(200).send({ message : 'Success'})
})

/*
Deletes a society from the database 
Body should contain the following structure:
{
    societyId : Integer,
}
*/
router.post('/fomoDelSociety', async (req, res) => {
    await fomoSocieties.deleteOne({ societyId: req.body.societyId })
    res.status(200).send({ message : 'Success'})
})




app.listen(5000, async () => {
    await client.connect()
    console.log('Server started!')
    console.log('listening on port 5000')
})