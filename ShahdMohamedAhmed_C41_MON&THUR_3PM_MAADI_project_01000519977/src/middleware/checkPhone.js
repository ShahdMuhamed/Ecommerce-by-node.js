import { userModel } from "../../database/models/user.model.js"


export const  checkPhone = async(req,res,next)=>{
    let user = await userModel.findOne({mobileNumber: req.body.mobileNumber})
    if(user) return res.json({message : "phone number is already taken"})

    next()

}