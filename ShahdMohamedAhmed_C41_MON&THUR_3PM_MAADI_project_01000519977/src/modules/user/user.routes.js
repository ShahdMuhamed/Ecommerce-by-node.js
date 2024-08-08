import express from "express"
import { validation } from "../../middleware/validation.js"
import { forgetPasswordVal, paramsIdVal, recoveryEmailVal, signinVal, signupVal, updatePasswordVal, updateUserVal, verifyPasswordVal } from "./user.validation.js"
import { allowedTo, anotherUserProfile, authorized, deleteUser, forgetPassword, getRecoveryEmail, getSingleUser, protectedRoutes, signin, signup, updatePassword, updateUser, verifyOTP } from "./user.controller.js"
import { checkEmail } from "../../middleware/checkEmail.js"
import { hashPassword } from "../../middleware/hashPassword.js"
import { checkPhone } from "../../middleware/checkPhone.js"




const userRouter = express.Router([{mergeParams: true}])

userRouter
.route('/signup')
.post( validation(signupVal) ,checkEmail ,checkPhone , hashPassword ,  signup)
// .get()
userRouter
.route('/signin')
.post(  validation(signinVal)  , signin)

userRouter.
route('/verify')
.post(protectedRoutes , allowedTo('user') , validation(verifyPasswordVal) , verifyOTP)

userRouter.
route('/changePassword')
.patch(protectedRoutes ,allowedTo('user') , validation(updatePasswordVal) , updatePassword )
userRouter
.route('/forgetPassword')
.post(protectedRoutes ,allowedTo('user' ),   validation(forgetPasswordVal)  , forgetPassword)
userRouter
.route('/:id')
.get(protectedRoutes , allowedTo('user' , 'company_HR') ,authorized , validation(paramsIdVal) ,  getSingleUser)
.put(protectedRoutes, allowedTo('user' , 'company_HR') , authorized , validation(updateUserVal) , checkEmail , checkPhone , updateUser)
.delete(protectedRoutes , allowedTo('user' , 'company_HR')  , authorized,validation(paramsIdVal) , deleteUser )

userRouter.route('/recoveryEmail')
.post(protectedRoutes , allowedTo('company_HR') ,  validation(recoveryEmailVal) , getRecoveryEmail)

userRouter
.route('/profile/:id')
.get(protectedRoutes , allowedTo('user' , 'company_HR') , validation(paramsIdVal) , anotherUserProfile)

export default userRouter 