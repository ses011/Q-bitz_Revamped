const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');

const profilePage = (req, res) => res.render('profile');

const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(400).json({ error: 'Wrong username or password' });
    }
    req.session.account = Account.toAPI(account);
    return res.json({ redirect: '/play' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/play' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username is already in use' });
    }
    return res.status(500).json({ error: 'An error occured' });
  }
};

const changePassword = async (req, res) => {
  const currentPass = `${req.body.current}`;
  const newPass = `${req.body.pass}`;
  const newPass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const currentHash = await Account.generateHash(newPass);
    if (req.session.account.password === currentHash) {
      const newHash = await Account.generateHash(newPass);
      req.session.account.password = newHash;
      return res.json({ redirect: '/profile' });
    }
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occured'});
  }
}

const premiumToggle = async (req, res) => {
  try {
    const query = { _id: req.session.account._id };
    const docs = await Account.findOne(query);
    docs.premiumStatus = !docs.premiumStatus;
    await docs.save();

    return res.json({ status: docs.premiumStatus });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error changing account status' });
  }
};

const getStatus = async (req, res) => {
  try {
    const query = { _id: req.session.account._id };
    const docs = await Account.findOne(query).select(' premiumStatus ');

    return res.json({ status: docs.premiumStatus });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving account status' });
  }
};
module.exports = {
  loginPage,
  profilePage,
  login,
  signup,
  logout,
  changePassword,
  premiumToggle,
  getStatus,
};
