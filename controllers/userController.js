const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

//@desc  Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res) => {
    // console.log("SOmehow reached");
    const {userName, email, password} = req.body;
    if(!userName || !email || !password){
        // Validation failed
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("Email already registered");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({userName, email, password: hashPassword});
    if(user){
        res.status(201).json({_id: user.id, _email: user.email})
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc  Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res) => {
    // console.log("Somehow reached again");
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password, user.password )){
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '20m'});
        res.cookie("token",accessToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          }).status(200).json({accessToken});
    }else{
        res.status(400);
        throw new Error('Email or password is not valid');
    }
});


//@desc  Current user details
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req,res) => {
    res.status(200).json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};