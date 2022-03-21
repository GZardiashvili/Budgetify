const bcrypt = require('bcrypt');
const User = require('../../models/user');

async function getUserByEmail(email) {
  const user = await User.where({ email: new RegExp(email, 'i') }).exec();
  return user;
}

async function loginUser(email, password) {
  const user = await getUserByEmail(email);

  if (user[0] && bcrypt.compareSync(password, user[0].password)) {
    return user;
  }

  return null;
}

module.exports = { getUserByEmail, loginUser };
