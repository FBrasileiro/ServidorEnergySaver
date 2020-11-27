const express = require('express');
const deviceController = require('../controllers/deviceController');

const router = express.Router();
router.post('/sendUserData', deviceController.sendUserData);

module.exports = router;