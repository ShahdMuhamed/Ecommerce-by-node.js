import { companyModel } from "../../database/models/company.model.js"


export const  checkCompanyEmail = async(req,res,next)=>{
    let user = await companyModel.findOne({companyEmail: req.body.companyEmail})
    if(user) return res.json({message : "email already taken"})

    next()

}