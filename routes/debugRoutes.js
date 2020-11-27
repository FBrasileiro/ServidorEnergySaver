const express = require('express');
const debugController = require('../controllers/debugController');


const router = express.Router();
router.get('/data', debugController.getUserData)
    .post('/data', debugController.sendUserData)

module.exports = router;