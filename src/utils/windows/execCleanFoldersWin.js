import { exec } from "child_process"

export const cleanConvertedUploadFoldersWin = (uploadedFilesNames) => {
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
}