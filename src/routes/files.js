const fs = require("fs")
const express = require("express")
const router = express.Router()

const { makeUpload } = require("../middlewares/uploadFiles.js")
const { convertUploadedFiles } = require("../middlewares/convertFiles.js")

router.post("/convert-files", makeUpload, convertUploadedFiles, (request, response, next) => {
    const fileReadStream = fs.createReadStream(`${request.zipFile}`)
    response.setHeader('Content-disposition', `attachment; filename=${request.folderName}.zip`)
    fileReadStream.pipe(response)
})

module.exports = {
    filesRouter: router
}