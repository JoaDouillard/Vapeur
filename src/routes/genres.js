const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

router.get('/', genresController.getAllGenres);
router.post('/create', genresController.createGenre);
router.post('/delete/:id', genresController.deleteGenre);

module.exports = router;