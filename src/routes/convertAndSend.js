import fs from "fs"
import { Router } from "express"

import { makeUpload } from "../middlewares/uploadFiles.js"
import { convertUploadedFiles } from "../middlewares/convertFiles.js"

import { cleanConvertedUploadFoldersWin } from "../utils/windows/execCleanFoldersWin.js"
import { cleanConvertedUploadFoldersLin } from "../utils/linux/execCleanFoldersLin.js"

const router = Router()

export default router.post("/crlf-convert", makeUpload, convertUploadedFiles, (request, response, next) => {
    response.status(200).send({
        files: request.convertedFilesNames,
        folder: request.zipFile
    })

    const OSenv = process.env.OS
    if(OSenv && OSenv.toUpperCase().includes('WINDOW')){
        cleanConvertedUploadFoldersWin(request.uploadedFilesNames)
    } else {
        cleanConvertedUploadFoldersLin(request.uploadedFilesNames)
    }
})