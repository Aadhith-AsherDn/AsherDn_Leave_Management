const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authorize = (...roles) => {
    return (req,res,next)=>{

        if(!roles.includes(req.user.role))
            return res.status(403).json({
                message:"Access Denied"
            });

        next();
    }
}

module.exports = authorize;
