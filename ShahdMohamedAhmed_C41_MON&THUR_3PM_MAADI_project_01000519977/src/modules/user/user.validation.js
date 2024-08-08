import Joi from "joi"


const signupVal = Joi.object({
    firstName:Joi.string().min(2).max(200).required().trim(),
    lastName:Joi.string().min(2).max(200).required().trim(),
    email:Joi.string().email().required(),
    roleEmail:Joi.string().email().required(),
    dateOfBirth: Joi.date(),
    mobileNumber:Joi.number().required(),
    password:Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/).required(),
    rePassword: Joi.valid(Joi.ref('password')).required(),
    role: Joi.valid('user' , 'company_HR'),
    status: Joi.valid('online' , 'offline'),

})

const signinVal = Joi.object({
    // email:Joi.string().email().required(),
    password:Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/).required(),
}).keys({
    email: Joi.string().allow(''),
    mobileNumber: Joi.when('email', { is: '', then: Joi.number(), otherwise: Joi.string().allow('') })
  }).or('email', 'mobileNumber')

const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
}) 

const updateUserVal = Joi.object({
    id: Joi.string().hex().length(24),
    firstName:Joi.string().min(2).max(200).trim(),
    lastName:Joi.string().min(2).max(200).trim(),
    email:Joi.string().email(),
    roleEmail:Joi.string().email(),
    dateOfBirth: Joi.date(),
    mobileNumber:Joi.number()
})


const updatePasswordVal = Joi.object({
    id: Joi.string().hex().length(24),
    password:Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/).required(),
    newPassword:Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/).required(),
})

const forgetPasswordVal = Joi.object({
    // id: Joi.string().hex().length(24),
    roleEmail:Joi.string().email().required(),
})

const verifyPasswordVal = Joi.object({
    OTP:Joi.number(),
    password:Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/).required(),
})

const recoveryEmailVal = Joi.object({
    roleEmail:Joi.string().email().required(),
})

export{
    signupVal,
    paramsIdVal,
    updateUserVal,
    signinVal,
    updatePasswordVal, 
    forgetPasswordVal,
    verifyPasswordVal,
    recoveryEmailVal
}