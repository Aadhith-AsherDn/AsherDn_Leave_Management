const express = require("express");
const leaveRoutes = express.Router();
const validateToken = require("../middlewares/athuMiddle");
const roleBaseAthu = require("../middlewares/roleBasedAthu");
const {setleave,
    updateLeave,
    applyLeave,
    approveLeave,
    rejectLeave,
    updateLeaveStatus,
    getAllLeaves} = require("../controllers/leaveController");


leaveRoutes.post(
    "/:userEmail",
    validateToken,
    roleBaseAthu("Manager"),
    setleave
);

leaveRoutes.put(
    "/:userEmail",
    validateToken,
    roleBaseAthu("Manager"),
    updateLeave
);

leaveRoutes.post(
    "/apply",
    validateToken,
    applyLeave
);

leaveRoutes.put(
    "/status/:id",
    validateToken,
    updateLeaveStatus
);

leaveRoutes.put(
    "/approve/:id",
    validateToken,
    roleBaseAthu("Manager"),
    approveLeave
);

leaveRoutes.put(
    "/reject/:id",
    validateToken,
    roleBaseAthu("Manager"),
    rejectLeave
);

leaveRoutes.get(
    "/",
    validateToken,
    roleBaseAthu("Manager"),
    getAllLeaves
);

module.exports = leaveRoutes;