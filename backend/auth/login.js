const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const helper = require('./helpers/helper');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post('/', body('email').isEmail().normalizeEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const user = await helper.loginUser(req.body.email, req.body.password);
  if (user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      token: `Bearer ${token}`,
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
