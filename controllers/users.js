const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.get('/:id', (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  });
});

router.post('/', (req, res) => {
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
  user.save().then((savedUser) => {
    res.json(savedUser);
  });
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

  User.findByIdAndUpdate(req.params.id, user, { new: true }).then(
    (updatedUser) => {
      res.json(updatedUser);
    }
  );
});

module.exports = router;
