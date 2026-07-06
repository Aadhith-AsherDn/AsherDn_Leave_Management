const mongoose = require("mongoose");

const attenduserSchema = new mongoose.Schema(
    {
        userId:{
             type:Number,
            required:true

        },
        userName:{
            type:String,
            required:true
        },

        userEmail:{
            type:String,
            required:true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                     /^[a-zA-Z0-9._%+-]+@asherdn\.com$/,
                         "use vaild user email",
                     ]
        },
        
        userPassword:{
            type:String,
            required:true
        },
        resetPasswordToken: {
            type: String,
            default:null
        },
        resetPasswordExpire: {
            type: Date,
            default:null
        },
        role:{
            type:String,
            required:true,
             enum:{
                values:['intern','fullTime','admin','manager'],
                message: '{VALUE} is not a valid type.'
            }
        }
    },{
        timestamps:true
    }
)

module.exports = mongoose.model("login",attenduserSchema);

