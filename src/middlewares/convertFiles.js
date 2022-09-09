import { exec } from "child_process"

import { createZipArchive } from "../utils/createZip.js"

import { runExecConvertLinux } from "../utils/linux/execFileConverstionLin.js"
import { runExecConvertWindows } from "../utils/windows/execFileConverstionWin.js"

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

export const convertUploadedFiles = async (request, response, next) => {
    try {
        let folderName = Date.now().toString()
        exec(`cd ./src/user-folders/converted/ && mkdir ${folderName}`, (error, stdout, stderr) => {
            if (error) {
                return next("Erro ao criar diret�rio em Converted: " + error.message)
            }
            if (stderr) {
                return next("Stderr ao criar diret�rio em Converted: " + stderr)
            }
        })

        const { uploadedFilesNames } = request
        var convertedFilesNames = []
        let index = 0;
        asyncForEach(uploadedFilesNames, async (fileToConvert) => {
            try{
                const OSEnv = process.env.OS
                if(OSEnv && OSEnv.toUpperCase().includes('WINDOW')){
                    await runExecConvertWindows(folderName, fileToConvert).then(convertedFileName => { convertedFilesNames.push(convertedFileName) })
                    if(index === uploadedFilesNames.length - 1){
                        request.zipFile = await createZipArchive(folderName, convertedFilesNames)
                        request.convertedFilesNames = convertedFilesNames
                        request.folderName = folderName
                        next()
                    }
                } else {
                    await runExecConvertLinux(folderName, fileToConvert).then(convertedFileName => { convertedFilesNames.push(convertedFileName) })
                    if(index === uploadedFilesNames.length - 1){
                        request.zipFile = await createZipArchive(folderName, convertedFilesNames)
                        request.convertedFilesNames = convertedFilesNames
                        request.folderName = folderName
                        next()
                    }
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