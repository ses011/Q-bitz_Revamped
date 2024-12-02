const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getAllPuzzles', mid.requiresLogin, controllers.Puzzle.getAllPuzzles);
  app.get('/getRandomPuzzle', mid.requiresLogin, controllers.Puzzle.getRandomPuzzle);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/play', mid.requiresLogin, controllers.Puzzle.playerPage);

  app.get('/maker', mid.requiresLogin, controllers.Puzzle.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Puzzle.makePuzzle);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
