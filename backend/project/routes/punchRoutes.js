const express = require("express");
const punchRoutes = express.Router();
const validateToken = require("../middlewares/athuMiddle");
const roleBaseAthu = require("../middlewares/roleBasedAthu");
const {punchIn,
    punchOut,
    attendanceByDate,
    workHours,
    todayPunch} = require("../controllers/punchController");
    

punchRoutes.post(
    "/punch-in",
    validateToken,
    punchIn
);

punchRoutes.put(
    "/punch-out",
    validateToken,
    punchOut
);

punchRoutes.get(
    "/attendance/:date",
    validateToken,
    roleBaseAthu("Manager","Super Admin"),
    attendanceByDate
);

punchRoutes.get(
    "/workhours/:date",
    validateToken,
    roleBaseAthu("Manager","Super Admin"),
    workHours
);

punchRoutes.get(
    "/today",
    validateToken,
    todayPunch
);
module.exports = punchRoutes;