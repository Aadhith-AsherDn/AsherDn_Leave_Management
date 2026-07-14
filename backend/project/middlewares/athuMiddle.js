const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async (req, res, next) => {

    let token;

    const authHeader =
        req.headers.authorization || req.headers.Authorization ;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token missing"
        });
    }

    token = authHeader.split(" ")[1];

    try {

    const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );

    req.user = decoded.user;

    next();

    }
    catch(err){

        return res.status(401).json({
            success:false,
            msg:"Invalid Token"
        });

}

});

module.exports = validateToken;