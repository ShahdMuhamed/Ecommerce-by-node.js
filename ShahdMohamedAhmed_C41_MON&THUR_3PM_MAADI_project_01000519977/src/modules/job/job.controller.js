import jwt from "jsonwebtoken"
import { catchError } from '../../middleware/catchError.js'
import { AppError } from "../../utils/appError.js"
import { jobModel} from '../../../database/models/job.model.js'
import { companyModel } from "../../../database/models/company.model.js"
import{ applicationModel } from "../../../database/models/application.model.js"

//add job
const addJob = catchError(async (req, res, next)=>{
    req.body.addedBy = req.user._id
    let company = await companyModel.findOne({companyHR : req.user._id})
    req.body.company = company._id
    let job = new jobModel(req.body)
    await job.save()
    res.json({message:"success" , job})
})


//update job
const updateJob = catchError(async(req, res, next)=>{
    let job = await jobModel.findByIdAndUpdate(req.params.id , {jobTitle: req.body.jobTitle , jobLocation: req.body.jobLocation , workingTime:req.body.workingTime , jobDescription: req.body.jobDescription , technicalSkills: req.body.technicalSkills , softSkills:req.body.softSkills,  seniorityLevel:req.body.seniorityLevel})
    res.json({message:"success"})
})

//delete job
const deleteJob = catchError(async(req, res, next)=>{
    let job = await jobModel.findByIdAndDelete(req.params.id)
    res.json({message:"success"})
})

//get all jobs with company data
const join = catchError(async(req, res, next)=>{
    let job = await jobModel.find().populate('company')
    res.json({message:"success" , job} )
})


//get jobs related to specific company
const jobForCompany = catchError(async(req, res, next)=>{
    console.log( req.query.name)
    let company = await companyModel.findOne({companyName : req.query.name})
    let job =await jobModel.find({company : company._id})
    res.json({message:"success" , job} )

})

//get all jobs filtered
const getJob = catchError(async(req, res, next)=>{ 
    let filterObj = {...req.query}
    filterObj= JSON.stringify(filterObj)
    filterObj = JSON.parse(filterObj)
    let jobs = await jobModel.find(filterObj)
    res.json({message:"success" , jobs} )
})


//apply to job
const applyJob = catchError(async(req, res, next)=>{ 
    req.body.user = req.user._id
    req.body.job = req.params.id
    let job = await jobModel.findById(req.params.id)
    req.body.company = job.company
    let application = new applicationModel(req.body)
    await application.save()
    res.json({message:"success" , application})
})

export{
    addJob,
    updateJob,
    deleteJob,
    join,
    jobForCompany,
    getJob,
    applyJob


}