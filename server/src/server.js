console.log("notangles but better hahaha sorry ray get good");

import express from 'express';
import eventRoutes from './routes/event.js'
import societyRoutes from './routes/society.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import { verifyJWT } from './middleware/verifyJWT.js';
import { corsOptions } from './config/corsOptions.js';
import { credentials } from './middleware/credentials.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const PORT = process.env.PORT || 5000;

// Setup database
import {client, fomodb, fomoEvents, fomoSocieties, fomoUsers} from './database.js'

// Setup app
const app = express()
var router = express.Router()
app.use(express.json())
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/', authRoutes);
// Add all the routes
app.use('/event', eventRoutes);
app.use('/society', societyRoutes);
app.use('/user', userRoutes);


// Start the server at port 5000
app.listen(PORT, async () => {
    await client.connect()
    console.log('Server started!')
    console.log(`listening on port ${PORT}`)
})