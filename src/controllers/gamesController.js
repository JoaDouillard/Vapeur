const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');

const prisma = new PrismaClient();

// Configuration Multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/games/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = {
  upload,

  // Affichage du formulaire de création
  showCreateForm: async (req, res) => {
    try {
      const genres = await prisma.genre.findMany();
      const editors = await prisma.editor.findMany();
      res.render('games/createGame', { genres, editors }); // Vue différente pour le formulaire
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  // Récupération et affichage de tous les jeux
  getAllGames: async () => {
    try {
      const games = await prisma.game.findMany({
        include: { genre: true, editor: true },
      });
      return games; // Retourne les jeux
    } catch (error) {
      console.error(error);
      throw new Error('Erreur lors de la récupération des jeux'); // Propage l'erreur
    }
  },

  // Création d'un jeu
  createGame: async (req, res) => {
    try {
      const { title, description, releaseDate, genreId, editorId } = req.body;
      const coverImage = req.file ? req.file.filename : null;

      await prisma.game.create({
        data: {
          title,
          description,
          releaseDate: new Date(releaseDate),
          coverImage,
          genreId: parseInt(genreId),
          editorId: parseInt(editorId),
        }
      });

      res.redirect('/games');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la création du jeu');
    }
  },

  // Suppression d'un jeu
  deleteGame: async (gameId) => {
    try {
      const game = await prisma.game.findUnique({
        where: { id: gameId },
      });

      if (!game) {
        throw new Error("Le jeu n'existe pas");
      }

      // Supprimer le jeu de la base de données
      await prisma.game.delete({
        where: { id: gameId },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la suppression du jeu");
    }
  },
};