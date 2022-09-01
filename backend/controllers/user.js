const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.signup = (req,res, next) => {

    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(
                () => {
                    res.status(201).json({ 
                        message: 'User added successfully'
                    });
                }
            ).catch((error) => {
                res.status(500).json({
                    error: error
                });
            })
        }
    )
};


exports.login = (req, res, next) => {

    //Check that user exists in database
    // Compare entered email with databased saved email
        User.findOne({ email: req.body.email}).then(
            (user) => {
                // If we dont get user from database, send error response (User not found)
                if(!user) {
                   return res.status(401).json({
                        error: new Error('User not found')
                    });
                } // If user exists we compare entered password with hash from the database
                bcrypt.compare(req.body.password, user.password).then(
                    (valid) => {
                        if (!valid) {
                            return res.status(401).json({
                                error: new Error('Incorrect password')
                            });
                        } // Is credentials are correct we return the userId and Token
                        const token = jwt.sign(
                            {userId: user._id},
                             'RANDOM_TOKEN_SECRET',
                             {expiresIn: '24h'});
                        res.status(200).json({
                            userId: user._id,
                            token: token
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            error: error
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            error: error
                        });
                    }
                );
            }
        ) 
};