const asyncHandler = require("express-async-handler");
const leaveModel  = require("../models/leaveModel");

const setleave = asyncHandler(async(req,res)=>{
    const {userEmail,addOnLeave,payedLeave,sickLeave} = req.body;
    
    if(addOnLeave <= 0 ||payedLeave <= 0||sickLeave <= 0 || !userEmail){
        return res.status(400).json({
            msg:"enter the coorect leave days"
        });
    }

    const existing = await leaveModel.findOne({ userEmail });

        if (existing) {
        return res.status(400).json({
            msg: "Leave already exists for this user"
        });
    }

    const setLeaveNew = await leaveModel.create({
        userEmail,
        addOnLeave,
        payedLeave,
        sickLeave,
    });
    return res.status(201).json({
    msg: "Leave created successfully",
    data: setLeaveNew
    });
});

const updateLeave = asyncHandler(async (req, res) => {

    const { userEmail, addOnLeave, payedLeave, sickLeave } = req.body;

    const updated = await leaveModel.findOneAndUpdate(
        { userEmail },
        {
            addOnLeave,
            payedLeave,
            sickLeave 
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updated) {
        return res.status(404).json({
            msg: "User not found"
        });
    }

    return res.status(200).json({
        msg: "Leave updated successfully",
        data: updated
    });
});

module.exports = {
    setleave,
    updateLeave
};