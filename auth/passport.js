const helper = require('./helpers/helper');

const jwtCallback = (jwt_payload, done) => {
  const user = helper.getUserByEmail(jwt_payload.email);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};

module.exports = {
  jwtCallback,
};
