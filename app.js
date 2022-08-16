import express  from 'express';
import mongoose from 'mongoose';
import router from './router/router.js';
import env from 'dotenv'
import cookieParser from 'cookie-parser'

env.config()
const PORT = process.env.PORT || 3000


const app = express();

app.set('view engine', 'ejs');
// middleware
app.use(express.static('public'));

app.use(express.json())
app.use(cookieParser())
app.use('/' , router)
// view engine
app.set('view engine', 'ejs');

// database connection


app.listen(PORT , ()=> {
    console.log(`Listening on port ${PORT}`)
})