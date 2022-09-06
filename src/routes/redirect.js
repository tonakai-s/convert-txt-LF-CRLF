import { Router } from 'express'

const router = Router()

export default router.get('/', (request, response) => {
  response.status(301).redirect("/files/crlf-convert");
})