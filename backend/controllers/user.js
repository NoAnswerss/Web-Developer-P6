const bcrypt = require('bcrypt');
const User = require('../models/user');

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

};


















/* const User = require('..//models/user');

exports.signup = (req, res, next) => {
    const user = new User({ 
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(() => res.status(201).json({ message: 'User created !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).json({ error: 'User not found !'});
        }
    })
} */