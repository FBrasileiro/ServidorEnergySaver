const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


const router = express.Router();

router.patch('/update', authController.protect, userController.updateUser)
      .delete('/delete', authController.protect, userController.deleteUser)
      .post('/forgotPassword', authController.forgotPassword)
      .post('/resetPassword', authController.resetPassword)
      .get('/getUserData', authController.protect, userController.getUserData)
      .get('/getUserInfo', authController.protect, userController.getUserInfo)
      .get('/getUserSyncedDevices', authController.protect, userController.getUserSyncedDevices)
      .get('/getSyncedDeviceData', authController.protect, userController.getSyncedDeviceData)
      

module.exports = router;