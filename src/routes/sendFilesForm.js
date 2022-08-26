const express = require('express');
const path = require('path');

const router = express.Router()

router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/../views/index.html'));
})


module.exports = {
    homeRouter: router
}