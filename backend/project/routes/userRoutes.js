const express = require("express");
const routes = express.Router();

const validateToken = require("../middlewares/athuMiddle");

const {register,userLogin,forgotPassword} = require("../controllers/userControlller");

routes.post("/register",register);
routes.post("/forget-password",forgotPassword);
routes.post("/",userLogin);

module.exports = routes;
