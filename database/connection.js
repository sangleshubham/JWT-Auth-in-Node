import mongoose from 'mongoose'
import env from 'dotenv'


env.config()// get data from .env file
const dbURI = process.env.MONGO_URI;

await mongoose.connect(dbURI , {useNewUrlParser : true , useUnifiedTopology : true , useCreateIndex : true}).then( (res) => {
        console.log('Databse Conneceted')
    } ).catch( (err)=> {
        console.log(err)
    } )
    



