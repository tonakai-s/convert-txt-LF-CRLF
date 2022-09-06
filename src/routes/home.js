import { Router } from 'express'
import path from 'path'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = Router()

export default router.get('/crlf-convert', function(request, response) {
  response.sendFile(path.join(__dirname, '/../views/index.html'));
})