const mongoose = require("mongoose");

const leaveRequestModel = mongoose.Schema({

    leaveRequestId:{
        type:Number,
        required:true

    },
    userEmail:{
        type:String,
        required:true
    },

    leaveType:{
        type:String,
        enum:["Paid","Sick","Casual"]
    },

    fromDate:{
        type:Date,
        required:true
    },

    toDate:{
        type:Date,
        required:true
    },

    reason:String,

    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    }
})

module.exports = mongoose.model("LeaveRequest", leaveRequestModel);