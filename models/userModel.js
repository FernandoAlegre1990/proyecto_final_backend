import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'name is required']
    },
    email:{
        type: String,
        required:[true, 'email is required'],
        unique:[true, 'email already taken']
    },
    password:{
        type: String,
        required:[true, 'password is required'],
        minLenght:[6, 'password lenght should be greater than 6 characters']
    },
    address:{
        type: String,
        required:[true, 'addres is required']
    },
    city:{
        type: String,
        required:[true, 'city is required']
    },
    country:{
        type: String,
        required:[true, 'country is required']
    },
    phone:{
        type: String,
        required:[true, 'phone is required']
    },
    profilePic:{
        type: String,
    },
},{timestamps:true});

export const User = mongoose.model("Users", userSchema);