import Joi from "joi"



const addJobval = Joi.object({
    jobTitle:Joi.string().min(2).max(200).required().trim(),
    jobLocation:Joi.string().min(2).max(200).required().trim(),
    workingTime:Joi.string().min(2).max(300).required().trim(),
    jobDescription:Joi.string().min(10).max(500).required().trim(),
    technicalSkills:Joi.array().required(),
    softSkills:Joi.array().required(),
    addedBy:Joi.string().hex().length(24),
    seniorityLevel: Joi.valid('Junior' , 'Mid-Level' ,'Senior' , 'Team-Lead' , 'CTO'),
    company:Joi.string().hex().length(24),
})

const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
}) 


const updateJobVal = Joi.object({
    id: Joi.string().hex().length(24),
    jobTitle:Joi.string().min(2).max(200).trim(),
    jobLocation:Joi.string().min(2).max(200).trim(),
    workingTime:Joi.string().min(2).max(300).trim(),
    jobDescription:Joi.string().min(10).max(500).trim(),
    technicalSkills:Joi.array(),
    softSkills:Joi.array(),
    addedBy:Joi.string().hex().length(24),
    seniorityLevel: Joi.valid('Junior' , 'Mid-Level' ,'Senior' , 'Team-Lead' , 'CTO'),
    company:Joi.string().hex().length(24),
})




// userResume : String
const applyJobVal = Joi.object({
    id: Joi.string().hex().length(24),
    userSoftSkills:Joi.array().required(),
    userTechSkills:Joi.array().required(),
    job:Joi.string().hex().length(24),
    user:Joi.string().hex().length(24),
    company:Joi.string().hex().length(24),

})


export{
    addJobval,
    updateJobVal,
    paramsIdVal,
    applyJobVal
}