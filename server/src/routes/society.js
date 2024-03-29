import express, { application } from "express";
import { ObjectId } from "mongodb";
import { fomoSocieties, fomoUsers } from "../database.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = express.Router();

/*
Returns a list of all societies in the db
*/
router.get("/getAll", async (req, res, next) => {
  try {
    const societies = await fomoSocieties.find({}).toArray();
    res.status(200).send(societies);
  } catch (err) {
    next(err);
  }
});

export { router as default };

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
router.post("/add", async (req, res, next) => {
  try {
    await fomoSocieties.insertOne(req.body);
    res.status(200).send({ message: "Success" });
  } catch (err) {
    next(err);
  }
});

/*
Adds a user to a given society
Authenticated user must be an admin
Body should contain the following structure:
{
    societyId: string,
    userId: string,
}
*/
router.post("/addUser", async (req, res, next) => {
  try {
    console.log(req.body.societyId);
    let societies = await fomoSocieties
      .find({ _id: ObjectId(req.body.societyId) })
      .toArray();
    let society = societies[0];
    // Check if auth user has perms
    if (!society.admins.includes(req.userId)) {
      return res.status(403).send({ error: "Auth user not admin of society" });
    }
    console.log(society.users);

    const user = await fomoUsers.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: "User with email not found" });
    }
    const userId = user._id.toString();
    // Check if user is already in society
    if (society.users.includes(userId)) {
      return res.status(400).send({ error: "User already in society" });
    }
    // Add user to society
    let societyUsers = society.users;
    societyUsers.push(userId);
    await fomoSocieties.updateOne(
      { _id: ObjectId(req.body.societyId) },
      { $set: { users: societyUsers } }
    );
    res.send("success");
  } catch (err) {
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
router.post("/removeUser", async (req, res, next) => {
  try {
    console.log(req.body.societyId);
    let societies = await fomoSocieties
      .find({ _id: ObjectId(req.body.societyId) })
      .toArray();
    let society = societies[0];
    // Check if auth user has perms
    if (!society.admins.includes(req.userId)) {
      return res.status(403).send({ error: "Auth user not admin of society" });
    }
    // Remove user from society
    let societyUsers = society.users;
    societyUsers.filter((user) => {
      user._id.toString() !== req.body.userId;
    });
    societyUsers.push(req.userId);
    await fomoSocieties.updateOne(
      { _id: ObjectId(req.body.societyId) },
      { $set: { users: societyUsers } }
    );
    res.send("success");
  } catch (err) {
    next(err);
  }
});

/*
Deletes a society from the database 
Body should contain the following structure:
{
    societyId : Integer,
}
*/
router.post("/del", async (req, res) => {
  try {
    await fomoSocieties.deleteOne({ societyId: req.body.societyId });
    res.status(200).send({ message: "Success" });
  } catch (err) {
    next(err);
  }
});

/*
Adds a guild (discord server) to the user's society
{
    societyName: String,
    username: String,
    guildId: String
}
*/
router.post("/addGuild", async (req, res, next) => {
  try {
    // Check if there are dev permissions
    let authUser = await fomoUsers.findOne({ _id: ObjectId(req.userId) });
    if (authUser.dev !== true) {
      res.status(403).send({ error: "Not dev account" });
      return;
    }
    // Check if society exists
    let society = await fomoSocieties.findOne({
      societyName: req.body.societyName,
    });
    if (!society) {
      res.status(400).send({ error: "Society with given name does not exist" });
      return;
    }
    // Check if user is a part of society
    let user = await fomoUsers.findOne({ username: req.body.username });
    let userId = user._id.toString();
    if (!society.admins.includes(userId)) {
      res.status(400).send({ error: "Given user does not have permission" });
      return;
    }
    // Add the guild
    await fomoSocieties.updateOne(
      { _id: society._id },
      {
        $set: {
          guildId: req.body.guildId,
        },
      }
    );
    res.status(200).send({ message: "Success" });
    return;
  } catch (err) {
    next(err);
  }
});

/*
Searches for all societies where the user is an admin
*/
router.get("/get/userIsAdmin", async (req, res, next) => {
  try {
    let societies = await fomoSocieties.find().toArray();
    let foundSocieties = societies.filter((society) => {
      return society.admins.includes(req.userId);
    });
    res.status(200).send({ societies: foundSocieties });
    return;
  } catch (err) {
    next(err);
  }
});

/*
Searches for all societies where the user is a member
*/
router.get("/get/userIsMember", async (req, res, next) => {
  try {
    let societies = await fomoSocieties.find().toArray();
    let foundSocieties = societies.filter((society) => {
      return society.users.includes(req.userId);
    });
    res.status(200).send({ societies: foundSocieties });
    return;
  } catch (err) {
    next(err);
  }
});
