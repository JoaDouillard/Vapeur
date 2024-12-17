const express = require('express');
const router = express.Router();
const { 
  getAllGames, 
  showCreateForm, 
  createGame, 
  upload, 
  deleteGame 
} = require('../controllers/gamesController');
const prisma = require('../prismaClient'); // Assurez-vous que ce fichier pointe vers votre instance PrismaClient

// Route pour afficher la liste des jeux
router.get('/', async (req, res, next) => {
  try {
    const games = await getAllGames(); // Appel de la fonction pour obtenir les jeux
    res.render('games', { games });
  } catch (error) {
    console.error(error);
    next(error); // Passe l'erreur au middleware global
  }
});

// Route pour supprimer un jeu
router.post('/:id/delete', async (req, res) => {
  try {
    const gameId = parseInt(req.params.id);

    if (isNaN(gameId)) {
      throw new Error("ID de jeu invalide");
    }

    // Appel de la fonction pour supprimer un jeu
    await deleteGame(gameId);

    // Rediriger vers la liste des jeux après suppression
    res.redirect('/games');
  } catch (error) {
    console.error(error);
    res.status(500).send(`Erreur lors de la suppression du jeu: ${error.message}`);
  }
});

// Route pour afficher le formulaire de création d'un jeu
router.get('/create', showCreateForm);

// Route pour créer un jeu
router.post('/', upload.single('coverImage'), createGame);

// Route pour afficher le formulaire de modification d'un jeu
router.get('/:id/edit', async (req, res) => {
  try {
    const gameId = parseInt(req.params.id);
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { genre: true, editor: true },
    });
    const genres = await prisma.genre.findMany();
    const editors = await prisma.editor.findMany();

    if (!game) {
      return res.status(404).send('Jeu non trouvé');
    }

    res.render('games/editGame', { game, genres, editors });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du jeu');
  }
});

// Route pour mettre à jour un jeu
router.post('/:id/edit', async (req, res) => {
  try {
    const gameId = parseInt(req.params.id);
    const { title, description, releaseDate, genreId, editorId } = req.body;

    if (isNaN(gameId)) {
      throw new Error("ID de jeu invalide.");
    }

    // Vérifier que tous les champs requis sont présents
    if (!title || !releaseDate || !genreId || !editorId) {
      throw new Error("Tous les champs obligatoires ne sont pas remplis.");
    }

    // Mettre à jour le jeu dans la base de données
    await prisma.game.update({
      where: { id: gameId },
      data: {
        title,
        description,
        releaseDate: new Date(releaseDate),
        genreId: parseInt(genreId),
        editorId: parseInt(editorId),
      },
    });

    res.redirect('/games');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du jeu:', error.message);
    res.status(500).send(`Erreur lors de la mise à jour du jeu : ${error.message}`);
  }
});

module.exports = router;
