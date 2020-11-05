const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
router.patch('/update',userController.updateUser)
      .delete('/delete', userController.deleteUser)
      .get('/', userController.getUserData);

module.exports = router;