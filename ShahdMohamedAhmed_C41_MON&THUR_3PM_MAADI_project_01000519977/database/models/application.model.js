import mongoose from "mongoose";


const schema = new mongoose.Schema({
    job:{
        type: mongoose.Types.ObjectId,
        ref: 'job'
    } ,
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    } ,
    company:{
        type: mongoose.Types.ObjectId,
        ref: 'company'
    },
    userTechSkills: Array ,
    userSoftSkills: Array ,
    userResume : String
    
} , {timestamps: true})

export const applicationModel = mongoose.model('application' , schema)