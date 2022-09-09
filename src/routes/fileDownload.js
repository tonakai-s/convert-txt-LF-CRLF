import fs from "fs"
import { Router } from "express"

const router = Router()

export default router.post("/crlf-convert/file/:folder/:filename", (request, response, next) => {
    const { filename, folder } = request.params
    const filePath = `${process.env.INIT_CWD}\\src\\user-folders\\converted\\${folder}\\${filename}`
    response.download(filePath, (err) => {
        console.log("Passou aqui")
        if(err){
            response.status(500).json({
                Status: "error",
                Message: `Error on download files: ${err.message}`
            })
        }
    })
})