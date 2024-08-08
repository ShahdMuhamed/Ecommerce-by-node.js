import Joi from "joi"


const addCompanyVal = Joi.object({
    companyName:Joi.string().min(2).max(200).required().trim(),
    industry:Joi.string().min(2).max(200).required().trim(),
    address:Joi.string().min(2).max(300).required().trim(),
    description:Joi.string().min(10).max(500).required().trim(),
    companyEmail:Joi.string().email().required(),
    numberOfEmployees:Joi.number().required(),
    companyHR:Joi.string().hex().length(24),
})



const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
}) 

const updateCompanyVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    companyName:Joi.string().min(2).max(200).trim(),
    industry:Joi.string().min(2).max(200).trim(),
    address:Joi.string().min(2).max(300).trim(),
    description:Joi.string().min(10).max(500).trim(),
    companyEmail:Joi.string().email(),
    numberOfEmployees:Joi.number(),
})



export{
    addCompanyVal , 
    paramsIdVal,
    updateCompanyVal
}