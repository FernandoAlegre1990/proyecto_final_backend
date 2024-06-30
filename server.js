import express from 'express'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB  from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import Stripe from 'stripe'

const app = express()

//dotenv config
dotenv.config()

//stripe connection
export const stripe = new Stripe(process.env.STRIPE_API_SECRET)


// Configuración de Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
//Mongo connection
connectDB()

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())

//routes
app.use("/api/user", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/orders", orderRoutes)

app.get("/", (req, res)=>{
return res.status(200).send("<h1>Welcome to node server</h1>")
    
})
const PORT = process.env.PORT || 8080;


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} on ${process.env.NODE_ENV} mode`)
    })