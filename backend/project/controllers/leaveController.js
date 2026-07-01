const asyncHandler = require("express-async-handler");
const leaveModel  = require("../models/leaveModel");

const setleave = asyncHandler(async(req,res)=>{
    const {addOnLeave,payedLeave,sickLeave} = req.body;
    
    if(addOnLeave <= 0 ||payedLeave <= 0||sickLeave <= 0){
        return res.status(400).json({
            msg:"enter the coorect leave days"
        });
    }

    const setLeaveNew = await leaveModel.create({
        userId : req.user.id,
        addOnLeave,
        payedLeave,
        sickLeave,
    });
    return res.status(201).json({
    msg: "Leave created successfully",
    data: setLeaveNew
    });
});

const updateLeave = asyncHandler(async(req,res)=>{
    const olduser = await leaveModel.findOne({
            userId: req.user.id
        });

    if(!olduser){
        return res.status(404).json({
            msg:"user not found"
        });
    }

    const updatedleave = await leaveModel.findOneAndUpdate(
        {
            userId: req.user.id
        },
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    return res.status(200).json({
        msg: "Update successfully"
    });
});

module.exports = {
    setleave,
    updateLeave
};