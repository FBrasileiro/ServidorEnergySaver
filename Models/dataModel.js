const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");


const dataSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "username needed"]
    },
    user_id:{
        type:String,
        required:[true, "user id needed"]
    },
    device_id:{
        type:String,
        required:[true, "id needed"]
    },
    data:{
        consume:{
            type:Number,
            required:[true, 'needed']
        },
        date:{
            type:Date,
            required:[true, 'needed']
        }
    },
})

const Data = mongoose.model('Data', dataSchema);
module.exports = Data