const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {body, validationResult} = require('express-validator');

const router = express.Router();

router.post('/',
    body('email').custom((value) => {
        return User.find({
            email: value,
        }).then((user) => {
            if (user.length > 0) {
                return Promise.reject('Email already in use');
            }
        });
    }),
    body('password')
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        })
        .withMessage(
            'Password must be greater than 6 and contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const body = req.body;

        const user = new User({
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role,
            firstName: body.firstName,
            lastName: body.lastName,
            gender: body.gender,
            dateOfBirth: body.dateOfBirth,
            countryOfResidence: body.countryOfResidence,
        });
        user
            .save()
            .then((savedUser) => {
                res.json(savedUser);
            })
            .catch((error) => {
                console.error('The Promise is rejected!', error);
            });
    }
);

module.exports = router;
