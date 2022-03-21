const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const helper = require('./helpers/helper');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = await helper.loginUser(req.body.email, req.body.password);
  if (user[0]) {
    const payload = {
      id: user[0].id,
      email: user[0].email,
      role: user[0].role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      id: user[0].id,
      email: user[0].email,
      role: user[0].role,
      token: `Bearer ${token}`,
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
