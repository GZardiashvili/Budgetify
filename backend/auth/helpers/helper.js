const bcrypt = require('bcrypt');
const User = require('../../models/user');

async function getUserByEmail(email) {
  const user = await User.findOne({ email: new RegExp(email, 'i') }).exec();

  return user;
}

async function loginUser(email, password) {
  const user = await getUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }

  return null;
}

module.exports = { getUserByEmail, loginUser };
