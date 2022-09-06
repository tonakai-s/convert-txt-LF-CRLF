import { exec } from "child_process"

export const cleanConvertedUploadZippedFolders = (folderName, uploadedFilesNames) => {
    let delQuery = ''
    uploadedFilesNames.forEach(uploadedFile => {
        delQuery += `\"${uploadedFile}\" `
    })

    try{
        exec(`cd ./src/user-folders/uploads/ && del ${delQuery}`,
        (error, stdout, stderr) => {
            if(error){
                return `Error on delete files on uploads folder: ${error}`
            }
            if(stderr){
                return `Error on delete files on uploads folder: ${stderr}`
            }
        })
    } catch(error){
        return `Error on delete files on uploads folder: ${error}`
    }

    try{
        exec(`cd ./src/user-folders/converted/ && rmdir /s /q ${folderName}`,
        (error, stdout, stderr) => {
            if(error){
                return `Error on delete files on converted folder: ${error}`
            }
            if(stderr){
                return `Error on delete files on converted folder: ${stderr}`
            }
        })
    } catch(error){
        return `Error on delete files on converted folder: ${error}`
    }
}