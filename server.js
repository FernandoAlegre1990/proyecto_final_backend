import express from 'express'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB  from './config/db.js'

const app = express()

//dotenv config
dotenv.config()

//Mongo connection
connectDB()

//middlewares
app.use(express.json())
app.use(morgan('dev'))

app.use(cors())

app.get("/", (req, res)=>{
return res.status(200).send("<h1>Welcome to node server</h1>")
    
})
const PORT = process.env.PORT || 8080;


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
    })