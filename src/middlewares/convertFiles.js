const util = require("util")
const exec = util.promisify(require("child_process").exec)
const { createZipArchive } = require("../utils/createZip.js")

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

const runExec = (folderName, fileToConvert) => {
    return new Promise((resolve, reject) => {
        exec(`cd ./src/user-folders/uploads/ && TYPE "${fileToConvert}" | FIND "" /V > ../converted/${folderName}/"NEW_${fileToConvert}"`,
            (error, stdout, stderr) => {
                if (error) {
                    return reject(`Ocorreu um erro ao converter o arquivo ${fileToConvert}: ${error.message}`)
                }
                if (stderr) {
                    return reject(`Ocorreu um erro ao converter o arquivo ${fileToConvert}: ${stderr}`)
                }
                return resolve(`NEW_${fileToConvert}`)
            })
    })
}

const convertUploadedFiles = async (request, response, next) => {
    try {
        let folderName = Date.now().toString()
        exec(`cd ./src/user-folders/converted/ && mkdir ${folderName}`, (error, stdout, stderr) => {
            if (error) {
                return next("Erro ao criar diretório em Converted: " + error.message)
            }
            if (stderr) {
                return next("Stderr ao criar diretório em Converted: " + stderr)
            }
        })

        const { uploadedFilesNames } = request
        var convertedFilesNames = []
        let index = 0;
        asyncForEach(uploadedFilesNames, async (fileToConvert) => {
            try{
                await runExec(folderName, fileToConvert).then(convertedFileName => { convertedFilesNames.push(convertedFileName) })
                if(index === uploadedFilesNames.length - 1){
                    request.zipFile = await createZipArchive(folderName, convertedFilesNames)
                    request.myTest = "Teste"
                    request.folderName = folderName
                    next()
                }
                index++
            } catch(error){
                next(error)
            }
        })
    } catch (error) {
        return next(`Ocorreu um erro inesperado: ${error}`)
    }
}

module.exports = {
    convertUploadedFiles
}