import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from '../../../database/models/user.model.js'
import { catchError } from '../../middleware/catchError.js'
import { AppError } from "../../utils/appError.js"


//sign up user
const signup = catchError(async (req, res, next)=>{
    let user = new userModel(req.body)
    await user.save()
    res.json({message:"success" , user})
})

//user login
const signin = catchError(async (req, res, next) =>{
    let userEmail = await userModel.findOne({email : req.body.email})
    let userPhone = await userModel.findOne({mobileNumber : req.body.mobileNumber})
    if(userEmail && bcrypt.compareSync(req.body.password, userEmail.password)){
        let token = jwt.sign({userId: userEmail._id, role: userEmail.role} , process.env.JWT_KEY)
        let loggedinUser = await userModel.findOneAndUpdate({email : req.body.email} , {status:'online'})
        return res.json({message:"success" , token})
    }
    else if(userPhone && bcrypt.compareSync(req.body.password, userPhone.password)){
        let token = jwt.sign({userId: userPhone._id, role: userPhone.role} , process.env.JWT_KEY)
        let loggedin_user = await userModel.findOneAndUpdate({mobileNumber : req.body.mobileNumber} , {status:'online'})
        return res.json({message:"success" , token})
    }
    next(new AppError('incorrect email or password' , 401))

})



//update user
const updateUser = catchError(async(req, res, next)=>{
    let user = await userModel.findByIdAndUpdate(req.params.id , {email: req.body.email , mobileNumber: req.body.mobileNumber , recoveryEmail:req.body.recoveryEmail , dateOfBirth: req.body.dateOfBirth , lastName: req.body.lastName , firstName:req.body.firstName})
    res.json({message:"success"})
})


//delete user
const deleteUser = catchError(async(req, res, next)=>{
    let user = await userModel.findByIdAndDelete(req.params.id)
    res.json({message:"success"})
})


//user account
const getSingleUser = catchError(async(req, res, next)=>{
    let user = await userModel.findById(req.params.id)
    res.json({message:"success" , user})
})


//another user profile
const anotherUserProfile = catchError(async(req, res, next)=>{
    let user = await userModel.findById(req.params.id , 
        // {"-password , -role , -roleEmail , -status "}
        { password : 0 , role : 0 , roleEmail : 0 , status : 0 }
        )
    res.json({message:"success" , user})
})


//update password
const updatePassword = catchError(async(req, res, next)=>{
    
    let user = await userModel.findById(req.user._id)
    
    if(user && bcrypt.compareSync(req.body.password, user.password)){
        console.log(user)
        let token = jwt.sign({userId: user._id, role: user.role} , process.env.JWT_KEY)
        await userModel.findByIdAndUpdate(req.user._id , { password: req.body.newPassword })
        return res.json({message:"success" , token})
    }
    next(new AppError('incorrect password' , 401))
})


//forget password send otp
const forgetPassword = catchError(async(req, res, next)=>{
    let user = await userModel.findOne({roleEmail : req.body.roleEmail , _id : req.user._id})
    if(!user) return next(new AppError('incorrect recovery mail' , 401))

    var num = Math.floor(Math.random() * 90000) + 10000;
    let updated = await userModel.findByIdAndUpdate(req.user._id , {otp : num})

    return res.json({message:"your otp is " , num})
})


//verify otp and change password
const verifyOTP =  catchError(async(req, res, next)=>{

    let user = await userModel.findById(req.user.id)
    if(req.body.OTP != user.otp) return next(new AppError('incorrect otp' , 401))
    let updated = await userModel.findByIdAndUpdate(req.user._id , {password: req.body.password , otp: null})
    return res.json({message:"success" })

})


//all accounts with same recovery email
const getRecoveryEmail = catchError(async(req, res, next)=>{
    let users = await userModel.find({roleEmail : req.body.roleEmail})
    if(!users) return next(new AppError('user not found' , 401))
    return res.json({message:"success"  , users } )

})



const protectedRoutes = catchError(async (req, res, next)=>{
    let { token } = req.headers
    if(!token) return next(new AppError('token is not provided' , 401))
    let decoded = jwt.verify(token , process.env.JWT_KEY)

    let user = await userModel.findById(decoded.userId)
    if(!user) return next(new AppError('user not found' , 401))


    req.user = user
    next()

})

const authorized = catchError(async (req, res, next)=>{
    let { token } = req.headers
    let decoded = jwt.verify(token , process.env.JWT_KEY)
    // console.log(decoded)
    let loggedinUser = await userModel.findOne({_id  : req.params.id})
    if(loggedinUser._id != decoded.userId) return next(new AppError('un authorized action' , 401))
    next()
})

const allowedTo = (...roles) => {
    return catchError(async (req, res, next)=>{
        if(!roles.includes(req.user.role))
            return next(new AppError('unauthorized action') , 401)
        next()
    })
}

export{
    signup,
    signin,
    updateUser,
    protectedRoutes,
    deleteUser,
    getSingleUser,
    anotherUserProfile,
    authorized,
    updatePassword,
    forgetPassword,
    verifyOTP,
    getRecoveryEmail,
    allowedTo,
    
}