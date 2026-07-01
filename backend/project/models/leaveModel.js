const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
    ref:"login",
    required:true
    },
    addOnLeave:{
        type:Number,
        required:true,
        default: 0
    },
    payedLeave:{
        type:Number,
        required:true,
        default: 0
    },
    sickLeave:{
        type:Number,
        required:true,
        default: 0
    }
},{
    timestamps:true
})

module.exports = mongoose.model("leave",leaveSchema);