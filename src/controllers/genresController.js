const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllGenres: async (req, res) => {
    try {
      const genres = await prisma.genre.findMany({
        include: { games: true }
      });
      res.render('genres', { genres });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  createGenre: async (req, res) => {
    try {
      const { name } = req.body;
      const genre = await prisma.genre.create({
        data: { name }
      });
      res.redirect('/genres');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la création du genre');
    }
  },

  deleteGenre: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.genre.delete({
        where: { id: parseInt(id) }
      });
      res.redirect('/genres');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la suppression du genre');
    }
  }
};