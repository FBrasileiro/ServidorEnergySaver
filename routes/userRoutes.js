const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


const router = express.Router();

router.patch('/update', authController.protect, userController.updateUser)
      .delete('/delete', authController.protect, userController.deleteUser)
      .get('/getUserData', authController.protect, userController.getUserData)
      .post('/forgotPassword', authController.forgotPassword)
      .post('/resetPassword', authController.resetPassword);

module.exports = router;