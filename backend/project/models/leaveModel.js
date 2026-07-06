const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    addOnLeave: {
        type: Number,
        default: 0
    },
    payedLeave: {
        type: Number,
        default: 0
    },
    sickLeave: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("leave",leaveSchema);