import express, { application } from 'express'
import { ObjectId } from 'mongodb';
import { fomoSocieties, fomoUsers } from '../database.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { ObjectId } from 'mongodb';
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

export { router as default }

router.use(verifyJWT);


/*
Adds a society to the database 
Body should contain the following structure:
{
    societyName : String,
    users : string[],
    admins : string[]
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
Adds a user to a given society
Authenticated user must be an admin
Body should contain the following structure:
{
    societyId: string,
    userId: string,
}
*/
router.post('/addUser', async (req, res, next) => {
    try {
        console.log(req.body.societyId);
        let societies = await fomoSocieties.find({ _id: ObjectId(req.body.societyId) }).toArray();
        let society = societies[0];
        // Check if auth user has perms
        if (!society.admins.includes(req.userId)) {
            return res.status(403).send({ error : 'Auth user not admin of society' });
        }
        // Check if user is already in society
        if (society.users.includes(req.body.userId)) {
            return res.status(400).send({ error : 'User already in society' });
        }
        // Add user to society
        let societyUsers = society.users;
        societyUsers.push(req.body.userId);
        await fomoSocieties.updateOne({ _id: ObjectId(req.body.societyId) }, { $set: { users: societyUsers } });
        res.send("success")
    } catch(err) {
        next(err);
    }
});

/*
Removes a user from a given society
Authenticated user must be an admin
Body should contain the following structure:
{
    societyId: string,
    userId: string,
}
*/
router.post('/removeUser', async (req, res, next) => {
    try {
        console.log(req.body.societyId);
        let societies = await fomoSocieties.find({ _id: ObjectId(req.body.societyId) }).toArray();
        let society = societies[0];
        // Check if auth user has perms
        if (!society.admins.includes(req.userId)) {
            return res.status(403).send({ error : 'Auth user not admin of society' });
        }
        // Remove user from society
        let societyUsers = society.users;
        societyUsers.filter((user) => { user._id.toString() !== req.body.userId });
        societyUsers.push(req.userId);
        await fomoSocieties.updateOne({ _id: ObjectId(req.body.societyId) }, { $set: { users: societyUsers } });
        res.send("success")
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

/*
Adds a guild (discord server) to the user's society
{
    societyName: String,
    guildId: String
}
*/
router.post('/add/guild', async (req, res) => {
    try {
    } catch (err) {
        next(err);
    }
})
