const express = require("express");
const leaveRoutes = express.Router();
const validateToken = require("../middlewares/athuMiddle");
const roleBaseAthu = require("../middlewares/roleBasedAthu");
const {setleave,updateLeave} = require("../controllers/leaveController");


leaveRoutes.post("/",validateToken,roleBaseAthu('manager'),setleave);

leaveRoutes.put("/",validateToken,roleBaseAthu('manager'),updateLeave);

module.exports = leaveRoutes;