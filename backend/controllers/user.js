const User = require('../models/user');

exports.login =(req,res,next)=>{

    return res.status(200).json({message : 'user login'})
}
exports.signUp =(req,res,next)=>{

    return res.status(200).json({message : 'user signup login'})
}