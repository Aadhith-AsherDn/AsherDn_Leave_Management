const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userId:{
             type:Number,
            require:true

        },
        userName:{
            type:String,
            require:true
        },

        userEmail:{
            type:String,
            require:true,
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
            require:true
        },
        role:{
            type:String,
            require:true,
            default:"users",
             enum:{
                values:['admin','users','intern','super admin'],
                message: '{VALUE} is not a valid type.'
            }
        }
    },{
        timestamps:true
    }
)

module.exports = mongoose.model("login",userSchema);

