import fs from "fs"
import { Router } from "express"

import { makeUpload } from "../middlewares/uploadFiles.js"
import { convertUploadedFiles } from "../middlewares/convertFiles.js"

import { cleanConvertedUploadFoldersWin } from "../utils/windows/execCleanFoldersWin.js"
import { cleanConvertedUploadFoldersLin } from "../utils/linux/execCleanFoldersLin.js"

const router = Router()

export default router.post("/crlf-convert", makeUpload, convertUploadedFiles, (request, response, next) => {
    const fileReadStream = fs.createReadStream(`${request.zipFile}`)
    response.setHeader('Content-disposition', `attachment; filename=${request.folderName}.zip`)
    fileReadStream.pipe(response)

    if(process.env.OS && process.env.OS.toUpperCase().contains('WINDOW')){
        cleanConvertedUploadFoldersWin(request.folderName, request.uploadedFilesNames)
    } else {
        cleanConvertedUploadFoldersLin(request.folderName, request.uploadedFilesNames)
    }
})