const helper = require('./helpers/helper');
const User = require('../models/user');

const jwtCallback = async (jwt_payload, done) => {
  const user = await helper.getUserByEmail(jwt_payload.email);

  if (user) {
    return done(null, user);
  }

  return done(null, false);
};

module.exports = {
  jwtCallback,
};
