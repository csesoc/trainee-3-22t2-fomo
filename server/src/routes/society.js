import express from 'express'
import { fomoSocieties } from '../database.js';
const router = express.Router();

/*
Adds a society to the database 
Body should contain the following structure:
{
    societyId : Integer,
    societyName : String,
    username : String,
    password : String,
    users : integer[]
}
*/
router.post('/add', async (req, res) => {
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
router.post('/del', async (req, res) => {
    await fomoSocieties.deleteOne({ societyId: req.body.societyId })
    res.status(200).send({ message : 'Success'})
})

export { router as default}