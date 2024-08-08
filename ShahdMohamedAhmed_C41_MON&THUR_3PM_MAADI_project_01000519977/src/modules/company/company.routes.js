import express from "express"
import { validation } from "../../middleware/validation.js"
import { allowedTo , protectedRoutes } from "../user/user.controller.js"
import { addCompany, companyAuthorized, deleteCompany, getApplication, getCompany, searchCompany, updateCompany } from "./company.controller.js"
import { addCompanyVal, paramsIdVal, updateCompanyVal } from "./company.validation.js"
import { checkCompanyEmail } from "../../middleware/checkCompanyMail.js"
import { checkCompanyName } from "../../middleware/checkCompanyName.js"


const companyRouter = express.Router([{mergeParams: true}])


companyRouter
.route('/')
.post(protectedRoutes , allowedTo('company_HR') , validation(addCompanyVal) ,checkCompanyEmail, checkCompanyName,  addCompany)
.get(protectedRoutes , allowedTo('company_HR') , getCompany)

companyRouter
.route('/:id')
.put(protectedRoutes, allowedTo('company_HR') , companyAuthorized , validation(updateCompanyVal) , checkCompanyEmail , checkCompanyName , updateCompany)
.delete(protectedRoutes, allowedTo('company_HR') , companyAuthorized  ,validation(paramsIdVal)  ,  deleteCompany)

companyRouter
.route('/application')
.get(protectedRoutes, allowedTo('company_HR') , getApplication)
companyRouter
.route('/search/:key')
.get(protectedRoutes , allowedTo('user' , 'company_HR') , searchCompany)


export default companyRouter 