// Setup database
import { MongoClient } from 'mongodb';

import dotenv from 'dotenv'

dotenv.config();
const url = process.env.DATABASE_URL
let client = new MongoClient(url)
let fomodb = client.db('fomodb')
let fomoEvents = fomodb.collection('fomoEvents')
let fomoSocieties = fomodb.collection('fomoSocieties')

export {client, fomodb, fomoEvents, fomoSocieties}