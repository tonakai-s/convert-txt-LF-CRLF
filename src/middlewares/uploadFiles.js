import multer from "multer"
import path from "path"

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(`${__dirname}/../user-folders/uploads`))
    },
    filename: (request, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

let uploadFiles = multer({ storage: storage }).array("files", 10)

export const makeUpload = async (request, response, next) => {
    try{
        uploadFiles(request, response, (err) => {
            let uploadedFilesNames = []
            if(err){
                return next("Erro ao fazer upload do ou dos arquivos: " + err.message)
            }
            const files = request.files
            files.forEach(file => {
                uploadedFilesNames.push(file.filename)
            })
            
            request.uploadedFilesNames = uploadedFilesNames
            next()
        })
    }catch(error){
        return response.end(`Error catched on make upload: ${error}`)
    }
}