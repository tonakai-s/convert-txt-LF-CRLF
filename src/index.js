import bodyParser from "body-parser"
import cors from "cors"
import Express from "express"

import { fileURLToPath } from 'url'
import * as path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import filesRouter from "./routes/convertAndSend.js"
import homeRouter from "./routes/home.js"
import redirectHome from "./routes/redirect.js"

console.log(process.env)

const APP = Express();
const PORT = process.env.PORT || 3000

APP.use(bodyParser.urlencoded({
    extended: true
}))
APP.use(cors())

APP.use(Express.static(path.join(__dirname, 'public')))

APP.use("/files", filesRouter)
APP.use("/files", homeRouter)
APP.use(redirectHome)

APP.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})