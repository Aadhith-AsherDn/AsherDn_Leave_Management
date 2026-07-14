const asyncHandler = require("express-async-handler");
const login = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer=require("nodemailer");
const crypto = require("crypto");

const register = asyncHandler(async (req, res) => {
    const { userName, userEmail, userPassword,role} = req.body;
    if (!userName || !userEmail || !userPassword || !role) {
        return res.status(400).json({
            msg: "Fill all details"
        });
    }
    const passwordlength = userPassword.length;

    if (passwordlength < 8) {
    return res.status(400).json({
        msg: "Password must be at least 8 characters long"
    });
}

    let uppercase = 0;
    let lowercase = 0;
    let splchar = 0;
    let num = 0;

    for (let i = 0; i < passwordlength; i++) {
        const hexcode = userPassword.charCodeAt(i);

        if (
            (hexcode >= 0x20 && hexcode <= 0x27) ||
            (hexcode >= 0x3B && hexcode <= 0x40) ||
            (hexcode >= 0x5B && hexcode <= 0x60) ||
            (hexcode >= 0x7B && hexcode <= 0x7E)
        ) splchar++;

        if (hexcode >= 0x41 && hexcode <= 0x5A) uppercase++;

        if (hexcode >= 0x61 && hexcode <= 0x7A) lowercase++;

        if (hexcode >= 0x30 && hexcode <= 0x39) num++;
    }

    if (uppercase === 0 || lowercase === 0 || splchar === 0 || num === 0) {
    return res.status(400).json({
        msg: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    });
}
    

    const oldUser = await login.findOne({ userEmail });

    if (oldUser) {
        return res.status(400).json({
            msg: "User already registered"
        });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const lastUser = await login.findOne().sort({ userId: -1 });
    const nextUserId = lastUser ? lastUser.userId + 1 : 1;

    const newUser = await login.create({
        userId: nextUserId,
        userName,
        userEmail,
        userPassword: hashedPassword,
        role
    });

    return res.status(201).json({
        msg: "Registered successfully"        
    });
});

const userLogin = asyncHandler(async(req,res)=>{
    const {
        userEmail,userPassword
    } = req.body;

        if(!userEmail || !userPassword ){
           return  res.status(400).json({msg:"Fill all the details"});
        }

    const oldUser = await login.findOne({userEmail});
    
    if (!oldUser) {
    return res.status(400).json({
        msg: "Email or password does not match"
        });
    }

    const matchPassword = await bcrypt.compare(
        userPassword,
        oldUser.userPassword
    );
   
    if (!matchPassword) {
        return res.status(400).json({
            msg: "Email or password does not match"
        });
    }
    
    const accessToken =jwt.sign(
            {
                user: {
                    userId: oldUser.userId,
                    userName: oldUser.userName,
                    userEmail: oldUser.userEmail,
                    role : oldUser.role
                }
               
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "60m"
            }
    );
     return res.status(200).json({accessToken});
});

const forgotPassword = asyncHandler(async (req, res) => {

    const { userEmail } = req.body;

    if (!userEmail) {
        return res.status(400).json({
            msg: "Email is required"
        });
    }

    const user = await login.findOne({ userEmail });

    if (!user) {
        return res.status(404).json({
            msg: "User not found"
        });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
        to: user.userEmail,
        subject: "Reset Password",
        html: `
            <h2>Password Reset</h2>
            <p>Click the link below to reset your password.</p>
            <a href="${resetUrl}">Reset Password</a>
        `
    });

    return res.status(200).json({
        msg: "Password reset email sent"
    });
});
    console.log(process.env.EMAIL);
    console.log(process.env.EMAIL_PASSWORD); 
const transporter=nodemailer.createTransport({

    service:"gmail",
       

    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
    

});

const updateUser = asyncHandler(async (req, res) => {

    const oldUser = await login.findOne({
        userEmail: String(req.params.userEmail),
        userId: req.user.id
    });

    if (!oldUser) {
        return res.status(404).json({
            msg: "User not found"
        });
    }

    const updatedUser = await login.findOneAndUpdate(
        {
            userEmail: String(req.params.userEmail),
            userId: req.user.id
        },
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    return res.status(200).json({
        msg: "User updated successfully",
        user: updatedUser
    });

});

const deleteUser = asyncHandler(async (req, res) => {

    const oldUser = await login.findOne({
        userEmail: String(req.params.userEmail),
        userId: req.user.id
    });

    if (!oldUser) {
        return res.status(404).json({
            msg: "User not found"
        });
    }

    await oldUser.deleteOne();

    return res.status(200).json({
        msg: "User deleted successfully"
    });

});

const allUser = asyncHandler(async (req, res) => {
    const users = await login.find().select(
        "userName userEmail role"
    );

    return res.status(200).json(users);
});


module.exports = {register,userLogin, forgotPassword,allUser,deleteUser,updateUser};