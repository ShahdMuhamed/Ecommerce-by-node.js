


export const globalError = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500 ; 
    if(process.env.MODE == 'DEV'){
        res.status(err.statuscode).json({error: err.message , stack: err.stack})
    }
    else{
        res.status(err.statuscode).json({error: err.message})
    }
}