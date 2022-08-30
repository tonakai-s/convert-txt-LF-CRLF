import bodyParser from "body-parser"
import cors from "cors"
import Express from "express"

import filesRouter from "./routes/files.js"
import homeRouter from "./routes/sendFilesForm.js"

const APP = Express();
const PORT = process.env.PORT || 3000

APP.use(bodyParser.urlencoded({
    extended: true
}))
APP.use(cors())

APP.use("/files", filesRouter)
APP.use(homeRouter)

APP.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})