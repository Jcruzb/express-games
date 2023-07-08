const router = require('express').Router();
const gamesController = require('../controllers/games.controller');

// Games

router.get('/games', gamesController.listGames);

router.get('/games/create', gamesController.getCreateForm);
router.post('/games', gamesController.createGame);

router.get('/games/:id/edit', gamesController.getEditForm);
router.post('/games/:id', gamesController.editGame);

router.get('/games/:id', gamesController.getGame);
router.post('/games/:id/delete', gamesController.deleteGame);

module.exports = router;