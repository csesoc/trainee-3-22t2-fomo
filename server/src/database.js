// Setup database
import { MongoClient } from 'mongodb';
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// THIS IS VERY BAD PRACTICE. SINCE THE USERNAME AND PASSWORD ARE BELOW, THIS MEANS THAT ANYONE LOOKING AT OUR
// GITHUB CAN ACCESS OUR DATABASE. BUT SINCE THIS IS A TEST DATABASE I WILL LEAVE IT HERE.
// IF WE EVER USE THE DATABASE FOR DEPLOYMENT, WE NEED TO CHANGE THIS PASSWORD.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const url = 'mongodb+srv://fomo-username:01BbpU3wXQ14Kity@fomodatabase.iucadam.mongodb.net/?retryWrites=true&w=majority'
let client = new MongoClient(url)
let fomodb = client.db('fomodb')
let fomoEvents = fomodb.collection('fomoEvents')
let fomoSocieties = fomodb.collection('fomoSocieties')

export {client, fomodb, fomoEvents, fomoSocieties}