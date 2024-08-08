import mongoose from "mongoose"
import multer from "multer"
import { AppError } from "../utils/appError.js"



export const fileUpload =()=>{
    const storage = multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null , 'uploads/')
        },
        filename:(req, file, cb)=>{
            cb(null , new mongoose.Types.ObjectId + "-" + file.originalname)
        }
    })


    const upload = multer({storage })
    return upload
}


export const uploadSingleFile = fieldName =>  fileUpload().single(fieldName)
export const uploadArrayOfFiles = fieldName =>  fileUpload().array(fieldName , 10)
export const uploadField = fields =>  fileUpload.single(fields)