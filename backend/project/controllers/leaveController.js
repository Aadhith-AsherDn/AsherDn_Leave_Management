const asyncHandler = require("express-async-handler");
const leaveModel  = require("../models/leaveModel");
const login = require("../models/userModel");
const leaveRequest = require("../models/leaveRequest");


const setleave = asyncHandler(async (req, res) => {

    const { userEmail } = req.body;
    let { addOnLeave, paidLeave, sickLeave } = req.body;

    // Check user exists
    const user = await login.findOne({ userEmail });

    if (!user) {
        return res.status(404).json({
            msg: "User not found"
        });
    }

    // Check if leave already exists
    const existing = await leaveModel.findOne({ userEmail });

    if (existing) {
        return res.status(400).json({
            msg: "Leave already exists for this user"
        });
    }
    switch (user.role) {

        case "intern":
            paidLeave = 0;
            sickLeave = 6;
            addOnLeave = 0;
            break;

        case "employee":
            paidLeave = 12;
            sickLeave = 12;
            break;

        case "manager":
            paidLeave = 15;
            sickLeave = 12;
            break;

        default:
            return res.status(400).json({
                msg: "Invalid role"
            });
    }

    const leave = await leaveModel.create({
        userEmail,
        addOnLeave,
        paidLeave,
        sickLeave
    });

    return res.status(201).json({
        msg: "Leave created successfully",
        data: leave
    });

});

const updateLeave = asyncHandler(async (req, res) => {

    const { userEmail } = req.params;
    const { addOnLeave, paidLeave, sickLeave } = req.body;

    const employee = await leaveModel.findOne({ userEmail });

    if (!employee) {
        return res.status(404).json({
            msg: "Employee not found"
        });
    }

    if (addOnLeave !== undefined) {
        employee.addOnLeave = addOnLeave;
    }

    if (paidLeave !== undefined) {
        employee.paidLeave = paidLeave;
    }

    if (sickLeave !== undefined) {
        employee.sickLeave = sickLeave;
    }

    await employee.save();

    return res.status(200).json({
        msg: "Leave updated successfully",
        data: employee
    });
});


const applyLeave = asyncHandler(async (req, res) => {

    console.log("Apply Leave API Called");

    const { userEmail, role } = req.user;

    const {
        leaveType,
        fromDate,
        toDate,
        reason
    } = req.body;

    console.log("Logged User :", req.user);

    if (!leaveType || !fromDate || !toDate || !reason) {

        return res.status(400).json({
            success:false,
            msg:"All fields are required."
        });

    }

    const user = await login.findOne({ userEmail });

    console.log("Database User :", user);

    if(!user){

        return res.status(404).json({
            success:false,
            msg:"User not found."
        });

    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    if(isNaN(startDate)||isNaN(endDate)){

        return res.status(400).json({
            success:false,
            msg:"Invalid date."
        });

    }

    if(startDate > endDate){

        return res.status(400).json({
            success:false,
            msg:"From Date cannot be after To Date."
        });

    }

    const overlap = await leaveRequest.findOne({

        userEmail,

        status:{
            $ne:"Rejected"
        },

        fromDate:{
            $lte:endDate
        },

        toDate:{
            $gte:startDate
        }

    });

    if(overlap){

        return res.status(409).json({
            success:false,
            msg:"Leave already exists for these dates."
        });

    }

    const lastLeave = await leaveRequest
        .findOne()
        .sort({ id:-1 });

    const nextId = lastLeave ? lastLeave.id + 1 : 1;

    const leave = await leaveRequest.create({

        id:nextId,

        userEmail,

        leaveType,

        fromDate:startDate,

        toDate:endDate,

        reason:reason.trim(),

        status:"Pending"

    });

    return res.status(201).json({

        success:true,

        msg:"Leave applied successfully.",

        data:leave

    });

});

const approveLeave = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const request = await leaveRequest.findById(id);

    if (!request) {
        return res.status(404).json({
            msg: "Leave request not found"
        });
    }

    if (request.status === "Approved") {
        return res.status(400).json({
            msg: "Leave already approved"
        });
    }

    request.status = "Approved";

    await request.save();

    return res.status(200).json({
        msg: "Leave approved successfully",
        data: request
    });

});

const rejectLeave = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const request = await leaveRequest.findById(id);

    if (!request) {
        return res.status(404).json({
            msg: "Leave request not found"
        });
    }

    if (request.status === "Rejected") {
        return res.status(400).json({
            msg: "Leave already rejected"
        });
    }

    request.status = "Rejected";

    await request.save();

    return res.status(200).json({
        msg: "Leave rejected successfully",
        data: request
    });

});

const updateLeaveStatus = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
        return res.status(400).json({
            msg: "Invalid status"
        });
    }

    const request = await leaveRequest.findById(id);

    if (!request) {
        return res.status(404).json({
            msg: "Leave request not found"
        });
    }

    request.status = status;

    await request.save();

    return res.status(200).json({
        msg: `Leave ${status.toLowerCase()} successfully`,
        data: request
    });
});

const getAllLeaves = asyncHandler(async(req,res)=>{

    const allleaves = await leaveRequest.find();

    return res.status(200).json(allleaves);

});

module.exports = {
    setleave,
    updateLeave,
    applyLeave,
    approveLeave,
    rejectLeave,
    updateLeaveStatus,
    getAllLeaves
};