const mongoose = require("mongoose");

const punchSchema = new mongoose.Schema({

    userEmail:{
        type:String,
        required:true
    },

    presentDate:{
        type:String,
        required:true
    },

    punchIn:{
        type:Date,
        default:null
    },

    punchOut:{
        type:Date,
        default:null
    },

    totalHours:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:["Present","Late"],
        default:"Present"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Punch", punchSchema);