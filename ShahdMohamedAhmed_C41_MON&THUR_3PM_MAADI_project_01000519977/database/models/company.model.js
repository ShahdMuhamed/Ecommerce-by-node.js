import mongoose from "mongoose";


const schema = new mongoose.Schema({
    companyName: {
        type : String, 
        unique : true
    },
    description: String, 
    industry: String, 
    address: String, 
    numberOfEmployees: Number,
    companyEmail: {
        type : String, 
        unique : true
    },
    companyHR:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    } 
   
} , {timestamps: true})

export const companyModel = mongoose.model('company' , schema)