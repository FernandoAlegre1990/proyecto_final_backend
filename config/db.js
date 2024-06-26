import mongoose from "mongoose";


const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb Connected  ${mongoose.connection.host}` )
    } catch (err){
        console.log(`MongoDB Error ${error}`)
    }
}

export default connectDB