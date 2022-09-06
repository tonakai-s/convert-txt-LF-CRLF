import util from "util"
import { exec } from "child_process"

const asyncExec = util.promisify(exec)

export const runExecConvertWindows = (folderName, fileToConvert) => {
    return new Promise((resolve, reject) => {
        asyncExec(`cd ./src/user-folders/uploads/ && TYPE "${fileToConvert}" | FIND "" /V > ../converted/${folderName}/"NEW_${fileToConvert}"`,
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