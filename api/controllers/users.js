const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUpUser = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash
            });

            user.save()
                .then(user => {

                    const token = jwt.sign({
                        username: user.username,
                        _id: user._id
                    }, process.env.JWT_TOKEN, { expiresIn: '1h'});

                    const response = {
                        message: 'User Sign Up Successfully',
                        token: token
                    };

                    res.status(201).json(response);
                })
                .catch(err => {
                    if (err.code === 11000){
                        res.status(500).json({
                            message: 'Username Already Exist',
                            error: err.message
                        })
                    } else if (err.name === 'ValidationError'){
                        res.status(500).json({
                            message: 'Username Validation Failed',
                            error: err.message
                        })
                    }
                    res.status(500).json({
                        error: err
                    })
                })
        }
    });


};

exports.loginUser = (req, res, next) => {
    const un = req.body.username;
    User.findOne({ username: un }).exec()
        .then(user => {
            if (!user){
                res.status(404).json({
                    message: 'User not found'
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err){
                        return res.status(401).json({
                            message: 'Auth Failed'
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                            username: user.username,
                            _id: user._id
                        }, process.env.JWT_TOKEN, { expiresIn: '1h'});

                        return res.status(200).json({
                            message: 'Auth Successful',
                            token: token
                        })
                    }
                    res.status(401).json({
                        message: 'Auth Failed'
                    })
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};

exports.deleteUser = (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id }).exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted user'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};
