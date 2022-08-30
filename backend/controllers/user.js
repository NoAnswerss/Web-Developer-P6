const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require("bcrypt")

exports.signUp =(req,res,next)=>{
    return res.status(200).json({message : 'user signup login'})
}
exports.login =(req,res,next)=>{

    return res.status(200).json({message : 'user login'})
}

