const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.get('/:id?', (req, res) => {
    if (req.params.id) {

        User.findById(req.params.id)
            .then((user) => {
                if (user) {
                    res.json(user);
                } else {
                    res.status(404).end();
                }
            })
            .catch((error) => {
                console.error('The Promise is rejected!', error);
            });
    } else {
        User.find().then((users) => {
            if (users) {
                res.json(users);
            } else {
                res.status(404).end();
            }
        }).catch((error) => {
            console.error('The Promise is rejected!', error);
        });
    }
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(() => {
        res.status(204).end();
    });
});

router.put('/:id', (req, res) => {
    const body = req.body;

    const user = {
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        countryOfResidence: body.countryOfResidence,
    };

    User.findByIdAndUpdate(req.params.id, user, {new: true})
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((error) => {
            console.error('The Promise is rejected!', error);
        });
});

module.exports = router;
