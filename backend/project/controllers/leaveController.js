const asyncHandler = require("express-async-handler");
const leaveModel  = reqiure("../models/leaveModel.js");

const setleave = asyncHandler(async(req,res)=>{
    const {addOnLeave,payedleave,sickLeave} = req.body;
    
    if(addOnLeave<= 0 ||payedleave <= 0||sickLeave <= 0){
        return res.status(400).json({
            msg:"enter the coorect leave days"
        });
    }

    const setLeaveNew = await leaveModel.create({
        userId : req.user.id,
        addOnLeave,
        payedleave,
        sickLeave,
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