import mongoose from "mongoose";


const schema = new mongoose.Schema({
    firstName: String, 
    lastName: String, 
    email: {
        type : String, 
        unique : true,
    },
    password: String, 
    roleEmail: String,
    dateOfBirth: Date,
    mobileNumber:{
        type : Number,
        unique : true
    } ,
    role:{
        type:String,
        enum: ['company_HR' , 'user'],
        default: 'user'
    }, 
    status:{
        type:String,
        enum: ['online' , 'offline'],
        default: 'offline',      
    },
    otp:{
        type: Number,
        default : null
    }

} , {timestamps: true})

export const userModel = mongoose.model('user' , schema)