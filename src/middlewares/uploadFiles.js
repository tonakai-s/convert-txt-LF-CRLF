const multer = require("multer")
const path = require("path")

let storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(`${__dirname}/../user-folders/uploads`))
    },
    filename: (request, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

let uploadFiles = multer({ storage: storage }).array("files", 10)

const makeUpload = async (request, response, next) => {
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
        return response.end(`Erro catched on make upload: ${error}`)
    }
}

module.exports = {
    makeUpload
}