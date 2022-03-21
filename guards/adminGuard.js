const helper = require('../auth/helpers/helper');

const adminGuard = async (req, res, next) => {
  const user = await helper.getUserByEmail(req.user.email);
  if (user[0] && user[0].role.toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  adminGuard,
};
