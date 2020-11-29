const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

const deviceSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'The device must have a name'],
    },
    username:{
        type:String,
        required: [true, 'The device must known the owner username']
    },
    user_id:  {
        type: String,
        required: [true, 'The device must known the owner id']
    },
    color:{
        type:String,
        required: [true, 'The device must have a color']
    }
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;