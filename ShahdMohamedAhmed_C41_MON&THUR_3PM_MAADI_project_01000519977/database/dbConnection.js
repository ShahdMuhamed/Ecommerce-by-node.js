import mongoose from "mongoose";


export  function databaseConnection(){  mongoose.connect('mongodb://127.0.0.1:27017/project').then(()=>{
    console.log('database connected');
}).catch(err=>{
    console.log('database error' , err);
})
}