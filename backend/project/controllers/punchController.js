const asyncHandler = require ("express-async-handler");
const login = require("../models/userModel");
const Punch = require("../models/punchModel");


const punchIn = asyncHandler(async (req, res) => {

    const now = new Date();

    const date = now.toISOString().split("T")[0];
    console.log(req.user);

    const existing = await Punch.findOne({
        userEmail: req.user.userEmail,
        presentDate: date
    });

    if (existing) {
        return res.status(400).json({
            msg: "Already punched in today"
        });
    }

    let status = "Present";

    if (
        now.getHours() > 10 ||
        (now.getHours() === 10 && now.getMinutes() > 0)
    ) {
        status = "Late";
    }

    const attendance = await Punch.create({

        userEmail: req.user.userEmail,

        presentDate: date,

        punchIn: now,

        status

    });

    return res.status(201).json({

        msg: "Punch In Successful",

        data: attendance

    });

});


const punchOut = asyncHandler(async (req, res) => {
    console.log("clickon");

    const now = new Date();

    const date = now.toISOString().split("T")[0];

    const attendance = await Punch.findOne({

        userEmail: req.user.userEmail,

        presentDate: date

    });

    if (!attendance) {
        return res.status(400).json({
            msg: "Please Punch In First"
        });
    }

    if (attendance.punchOut) {
        return res.status(400).json({
            msg: "Already Punched Out"
        });
    }

    attendance.punchOut = now;

    const totalHours =

        (attendance.punchOut - attendance.punchIn)

        / (1000 * 60 * 60);

    attendance.totalHours = Number(totalHours.toFixed(2));

    await attendance.save();

    return res.status(200).json({

        msg: "Punch Out Successful",

        data: attendance

    });

});


const attendanceByDate = asyncHandler(async (req, res) => {

    const { date } = req.params;

    const users = await login.find(
        {},
        "userName userEmail role"
    );

    const punches = await Punch.find({

        presentDate: date

    });

    const presentEmails = punches.map(

        employee => employee.userEmail

    );

    const present = users
        .filter(user => presentEmails.includes(user.userEmail))
        .map(user => {

            const punch = punches.find(

                employee => employee.userEmail === user.userEmail

            );

            return {

                userName: user.userName,

                userEmail: user.userEmail,

                role: user.role,

                punchIn: punch.punchIn,

                punchOut: punch.punchOut,

                totalHours: punch.totalHours,

                status: punch.status

            };

        });

    const absent = users.filter(

        user => !presentEmails.includes(user.userEmail)

    );

    return res.status(200).json({

        date,

        presentCount: present.length,

        absentCount: absent.length,

        present,

        absent

    });

});



const workHours = asyncHandler(async (req, res) => {

    const { date } = req.params;

    const punches = await Punch.find({

        presentDate: date

    });

    const users = await login.find();

    const report = punches.map(punch => {

        const employee = users.find(

            user => user.userEmail === punch.userEmail

        );

        return {

            userName: employee?.userName,

            userEmail: punch.userEmail,

            role: employee?.role,

            punchIn: punch.punchIn,

            punchOut: punch.punchOut,

            totalHours: punch.totalHours,

            status: punch.status

        };

    });

    return res.status(200).json({

        totalEmployees: report.length,

        report

    });

});

const todayPunch = asyncHandler(async (req, res) => {

    const today = new Date().toISOString().split("T")[0];

    const attendance = await Punch.findOne({
        userEmail: req.user.userEmail,
        presentDate: today
    });

    if (!attendance) {
        return res.status(200).json({
            isPunchedIn: false,
            isPunchedOut: false,
            data: null
        });
    }

    return res.status(200).json({
        isPunchedIn: true,
        isPunchedOut: attendance.punchOut !== null,
        data: attendance
    });

});


module.exports = {

    punchIn,
    todayPunch,
    punchOut,
    attendanceByDate,
    workHours

};