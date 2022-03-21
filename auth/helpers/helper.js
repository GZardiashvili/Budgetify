const bcrypt = require('bcrypt');
const db = require('../../mockData/dummyDB');

function getUserByEmail(email) {
  return db.users.find((user) => user.email === email);
}

function loginUser(email, password) {
  const user = getUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }

  return null;
}

module.exports = { getUserByEmail, loginUser };
