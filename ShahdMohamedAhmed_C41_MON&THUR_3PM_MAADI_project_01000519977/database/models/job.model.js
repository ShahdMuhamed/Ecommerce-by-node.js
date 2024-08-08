import mongoose from "mongoose";


const schema = new mongoose.Schema({
    jobTitle: String, 
    jobLocation: String, 
    workingTime: String, 
    seniorityLevel:{
        type:String,
        enum: ['Junior' , 'Mid-Level' ,'Senior' , 'Team-Lead' , 'CTO' ],
        default: 'Junior'
    }, 
    jobDescription:String,
    technicalSkills:Array,
    softSkills:Array,
    addedBy:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    } ,
    company:{
        type : mongoose.Types.ObjectId,
        ref: 'company'
    }
   
} , {timestamps: true})

export const jobModel = mongoose.model('job' , schema)