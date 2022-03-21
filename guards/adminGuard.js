const helper = require('../auth/helpers/helper');

const adminGuard = (req, res, next) => {
  const user = helper.getUserByEmail(req.user.email);
  if (user && user.role.toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  adminGuard,
};
