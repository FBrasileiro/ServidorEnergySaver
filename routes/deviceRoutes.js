const express = require('express');
const deviceController = require('../controllers/deviceController');

const router = express.Router();
// Colocar algum middleware de segurança?
router.post('/sendUserData', deviceController.sendUserData)
      .post('/syncUser', deviceController.syncUser);

module.exports = router;