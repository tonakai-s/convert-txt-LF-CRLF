import { Router } from "express"

const router = Router()

export default router.post("/crlf-convert/full-folder/:folder", (request, response, next) => {
    const { filename, folder } = request.params
    const filePath = `${process.env.INIT_CWD}\\src\\user-folders\\zippedFiles\\${folder}`
    response.status(200).download(filePath, (error) => {
        if(error){
            response.status(500).end('Error: ' + error)
        }
    })
})