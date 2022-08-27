import express, { application } from 'express'
import { fomoSocieties } from '../database.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
const router = express.Router();

/*
Returns a list of all societies in the db
*/
router.get('/getAll', async (req, res, next) => {
    try {
    const societies = await fomoSocieties.find({}).toArray()
    res.status(200).send(societies)
    } catch(err) {
        next(err);
    }
})

export { router as default}

router.use(verifyJWT);


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
router.post('/add', async (req, res, next) => {
    try {
    await fomoSocieties.insertOne(req.body)
    res.status(200).send({ message : 'Success'})
    } catch(err) {
        next(err);
    }
})

/*
Deletes a society from the database 
Body should contain the following structure:
{
    societyId : Integer,
}
*/
router.post('/del', async (req, res) => {
    try {
    await fomoSocieties.deleteOne({ societyId: req.body.societyId })
    res.status(200).send({ message : 'Success'})
    } catch (err) {
        next(err);
    }
})