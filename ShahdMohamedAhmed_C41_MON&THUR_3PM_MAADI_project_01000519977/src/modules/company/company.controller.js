import jwt from "jsonwebtoken"
import { catchError } from '../../middleware/catchError.js'
import { AppError } from "../../utils/appError.js"
import { companyModel} from '../../../database/models/company.model.js'
import { applicationModel } from "../../../database/models/application.model.js"
import { jobModel } from "../../../database/models/job.model.js"


//add company
const addCompany = catchError(async (req, res, next)=>{
    req.body.companyHR = req.user._id
    let company = new companyModel(req.body)
    await company.save()
    res.json({message:"success" , company})
})



//update company
const updateCompany = catchError(async(req, res, next)=>{
    let company = await companyModel.findByIdAndUpdate(req.params.id , {companyName: req.body.companyName , industry: req.body.industry , address:req.body.address , description: req.body.description , companyEmail: req.body.companyEmail , numberOfEmployees:req.body.numberOfEmployees})
    res.json({message:"success"})
})

const companyAuthorized = catchError(async (req, res, next)=>{
    let { token } = req.headers
    let decoded = jwt.verify(token , process.env.JWT_KEY)
    // console.log(decoded)
    let company = await companyModel.findOne({companyHR  : decoded.userId})
    if(!company) return next(new AppError('un authorized action' , 401))
    next()
})



//delete company
const deleteCompany = catchError(async(req, res, next)=>{
    let company = await companyModel.findByIdAndDelete(req.params.id)
    res.json({message:"success"})
})

//search by company name
const searchCompany = catchError(async(req, res, next)=>{
    console.log(req.params.key)
    let company = await companyModel.find( {companyName : { $regex: req.params.key,}})
    if(!company) return next(new AppError('company not found' , 401))
    res.json({message:"success" , company})
})

//get company data with all jobs

const getCompany = catchError(async(req, res, next)=>{
    let company = await companyModel.aggregate([
            {
              $lookup: {
                from: "jobs",
                localField: "_id",
                foreignField: "company",
                as: "jobs"
              }
            }
          ])
          res.json({message: "success" , company})
        
})

const getApplication = catchError(async(req, res, next)=>{
    let company = await companyModel.findOne({companyHR : req.user._id})
    if(!company) return next(new AppError('no company found' , 401))
    let application = await applicationModel.find({company : company._id}).populate('user')
    res.json({message: "success" , application})
        
})
export{
    addCompany,
    updateCompany,
    companyAuthorized,
    deleteCompany,
    searchCompany,
    getCompany,
    getApplication
}