import express from "express"
const app = express()
const port = 3000

import { databaseConnection } from "./database/dbConnection.js"
import { bootstrap } from "./src/modules/index.routes.js"
import dotenv from "dotenv" 
dotenv.config()




app.use(express.json())
// app.use(bootstrap)

bootstrap(app)
databaseConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))