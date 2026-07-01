const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    userEmail:{
        type:mongoose.Schema.Types.ObjectId,
    ref:"login",
    require:true
    },
    addOnLeave:{
        type:Number,
        require:true,
        default: 0
    },
    payedLeave:{
        type:Number,
        require:true,
        default: 0
    },
    sickLeave:{
        type:Number,
        require:true,
        default: 0
    }
},{
    timestamps:true
})

module.exports = mongoose.model("leave",leaveSchema);