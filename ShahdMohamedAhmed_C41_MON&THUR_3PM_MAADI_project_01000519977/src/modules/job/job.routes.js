
import express from "express"
import { validation } from "../../middleware/validation.js"
import { addJobval, applyJobVal, paramsIdVal, updateJobVal } from "./job.validation.js"
import { addJob, applyJob, deleteJob, getJob, jobForCompany, join, updateJob } from "./job.controller.js"
import { allowedTo, protectedRoutes } from "../user/user.controller.js"
import { uploadSingleFile } from "../../services/fileupload.js"


const jobRouter = express.Router([{mergeParams: true}])


jobRouter
.route('/')
.post(protectedRoutes , allowedTo('company_HR') , validation(addJobval) ,  addJob)
.get(protectedRoutes , allowedTo('company_HR' , 'user') , join)

jobRouter
.route('/:id')
.put(protectedRoutes , allowedTo('company_HR') , validation(updateJobVal) , updateJob)
.delete(protectedRoutes, allowedTo('company_HR')   ,validation(paramsIdVal)  ,  deleteJob)

jobRouter
.route('/apply/:id')
.post(protectedRoutes , allowedTo('user') , uploadSingleFile('userResume') ,  validation(applyJobVal) , applyJob)


jobRouter
.route('/filter')
.get(protectedRoutes , allowedTo('company_HR' , 'user') , getJob)

jobRouter
.route('/company')
.get(protectedRoutes , allowedTo('company_HR' , 'user') , jobForCompany)
export{
    jobRouter
}