const express = require("express");
const routes = express.Router();

const validateToken = require("../middlewares/athuMiddle");

const {register,userLogin} = require("../controllers/userControlller");

routes.post("/register",register);

routes.post("/",userLogin);

module.exports = routes;
