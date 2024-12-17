const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
      res.render('games/createGame', { genres, editors });
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
      
      // Ajouter le chemin complet de l'image si elle existe
      return games.map(game => ({
        ...game,
        coverImagePath: game.coverImage 
          ? `/images/games/${game.coverImage}` 
          : null
      }));
    } catch (error) {
      console.error(error);
      throw new Error('Erreur lors de la récupération des jeux');
    }
  },

  // Création d'un jeu
  createGame: async (req, res) => {
    try {
      const { title, description, releaseDate, genreId, editorId } = req.body;
      const coverImage = req.file ? req.file.filename : null;

      // Vérification de l'existence du jeu
      const existingGame = await prisma.game.findFirst({
        where: { 
          title: { 
            equals: title.trim(),
            // Utilisez contains avec des conversions de casse
            contains: title.trim().toLowerCase() 
          } 
        }
      });

      if (existingGame) {
        return res.status(400).send('Un jeu avec ce titre existe déjà.');
      }

      // Vérification de la date
      if (!releaseDate) {
        return res.status(400).send('La date de sortie est obligatoire.');
      }

      await prisma.game.create({
        data: {
          title: title.trim(),
          description: description ? description.trim() : null,
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

      // Supprimer l'image associée si elle existe
      if (game.coverImage) {
        const imagePath = path.join('public/images/games/', game.coverImage);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
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

  // Mise à jour d'un jeu
  editGame: async (req, res) => {
    const gameId = parseInt(req.params.id);
    const { title, description, releaseDate, genreId, editorId } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    try {
      // Vérification de l'existence d'un autre jeu avec le même titre
      const existingGame = await prisma.game.findFirst({
        where: { 
          title: {
            equals: title.trim().toLowerCase(),
            contains: title.trim().toLowerCase()
          },
          NOT: { id: gameId } // Exclure le jeu actuel de la vérification
        }
      });

      if (existingGame) {
        return res.status(400).send('Un autre jeu avec ce titre existe déjà.');
      }

      // Vérification de la date
      if (!releaseDate) {
        return res.status(400).send('La date de sortie est obligatoire.');
      }

      const game = await prisma.game.findUnique({
        where: { id: gameId }
      });

      if (!game) {
        return res.status(404).send('Jeu non trouvé');
      }

      // Suppression de l'ancienne image si une nouvelle est téléchargée
      if (coverImage && game.coverImage) {
        const oldImagePath = path.join('public/images/games/', game.coverImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const updatedGame = await prisma.game.update({
        where: { id: gameId },
        data: {
          title: title.trim(),
          description: description ? description.trim() : null,
          releaseDate: new Date(releaseDate),
          coverImage: coverImage || game.coverImage,
          genreId: parseInt(genreId),
          editorId: parseInt(editorId),
        }
      });

      res.redirect('/games');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la mise à jour du jeu');
    }
  }
};