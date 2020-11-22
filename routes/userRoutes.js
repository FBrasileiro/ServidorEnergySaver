const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


const router = express.Router();
router.patch('/update', authController.protect, userController.updateUser)
      .delete('/delete', authController.protect, userController.deleteUser)
      .get('/', authController.protect, userController.getUserData);

module.exports = router;