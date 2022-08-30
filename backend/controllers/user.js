
const User = require('../models/user');
const crypto = require('crypto');

exports.signUp =(req,res,next)=>{
    return res.status(200).json({message : 'user signup login'})
}
exports.login =(req,res,next)=>{

    return res.status(200).json({message : 'user login'})
}

