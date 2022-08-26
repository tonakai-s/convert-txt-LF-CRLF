const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")

const { filesRouter } = require("./routes/files.js")
const { homeRouter } = require("./routes/sendFilesForm.js")

const APP = express();
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