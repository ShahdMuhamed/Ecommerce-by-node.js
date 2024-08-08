import { globalError } from "../middleware/globalError.js"
import companyRouter from "./company/company.routes.js"
import { jobRouter } from "./job/job.routes.js"
import userRouter from "./user/user.routes.js"



export const bootstrap = (app) => {
    app.use('/api/vi/users' , userRouter)   
    app.use('/api/vi/companies' , companyRouter)   
    app.use('/api/vi/jobs' , jobRouter)   
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use(globalError)
}