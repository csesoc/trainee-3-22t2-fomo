console.log("notangles but better hahaha sorry ray get good");

import express from 'express';
import eventRoutes from './routes/event.js'
import societyRoutes from './routes/society.js'
import authRoutes from './routes/auth.js'
import { verifyJWT } from './middleware/verifyJWT.js';
import cors from 'cors';

// Setup database
import {client, fomodb, fomoEvents, fomoSocieties, fomoUsers} from './database.js'

// Setup app
const app = express()
var router = express.Router()
app.use(express.json())
app.use(cors());
app.use('/', authRoutes);
// Verify JWT middleware (all routes below require an access token)
app.use(verifyJWT);

// Add all the routes
app.use('/event', eventRoutes);
app.use('/society', societyRoutes);


// Start the server at port 5000
app.listen(5000, async () => {
    await client.connect()
    console.log('Server started!')
    console.log('listening on port 5000')
})