const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAllEditors: async (req, res) => {
    try {
      const editors = await prisma.editor.findMany({
        include: { games: true }
      });
      res.render('editors', { editors });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur');
    }
  },

  createEditor: async (req, res) => {
    try {
      const { name } = req.body;
      const editor = await prisma.editor.create({
        data: { name }
      });
      res.redirect('/editors');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la création de l\'éditeur');
    }
  },

  deleteEditor: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.editor.delete({
        where: { id: parseInt(id) }
      });
      res.redirect('/editors');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la suppression de l\'éditeur');
    }
  }
};
