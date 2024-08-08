import { companyModel } from "../../database/models/company.model.js"


export const  checkCompanyName = async(req,res,next)=>{
    let user = await companyModel.findOne({companyName: req.body.companyName})
    if(user) return res.json({message : "name is already taken"})

    next()

}