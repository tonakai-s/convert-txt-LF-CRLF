import fs from "fs"
import { Router } from "express"

import { makeUpload } from "../middlewares/uploadFiles.js"
import { convertUploadedFiles } from "../middlewares/convertFiles.js"
import { cleanConvertedUploadZippedFolders } from "../utils/windows/execCleanFoldersWin.js"

const router = Router()

export default router.post("/crlf-convert", makeUpload, convertUploadedFiles, (request, response, next) => {
    const fileReadStream = fs.createReadStream(`${request.zipFile}`)
    response.setHeader('Content-disposition', `attachment; filename=${request.folderName}.zip`)
    fileReadStream.pipe(response)

    cleanConvertedUploadZippedFolders(request.folderName, request.uploadedFilesNames)
})