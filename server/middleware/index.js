/* eslint-disable linebreak-style */
const requiresLogin = (req, res, next) => {
  // eslint-disable-next-line linebreak-style
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/play');
  }
  return next();
};

const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

const bypassSecure = (req, res, next) => {
  next();
};

const requiresPremium = (req, res, next) => {
  if (req.session.account.premiumStatus) {
    return next();
  }
  return res.redirect('/profile');
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;
module.exports.requiresPremium = requiresPremium;

if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
