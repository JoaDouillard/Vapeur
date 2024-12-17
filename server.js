const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const gamesRoutes = require('./src/routes/games');
const genresRoutes = require('./src/routes/genres');
const editorsRoutes = require('./src/routes/editors');
const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Configuration de Handlebars avec les helpers
const hbs = engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  defaultLayout: 'main',
  helpers: {
    eq: (a, b) => a === b,
    formatDate: (date) => {
      if (!date) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    }
  }
});

app.engine('hbs', hbs);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.activePage = req.path;
  next();
});

app.get('/', async (req, res) => {
  try {
    const featuredGames = await prisma.game.findMany({
      take: 6,
      include: {
        genre: true,
        editor: true
      }
    });

    // Ajouter le chemin complet de l'image
    const gamesWithImagePaths = featuredGames.map(game => ({
      ...game,
      coverImagePath: game.coverImage 
        ? `/images/games/${game.coverImage}` 
        : null
    }));

    res.render('index', { 
      title: 'Accueil', 
      games: gamesWithImagePaths,
      activePage: '/' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Routes
app.use('/games', (req, res, next) => {
  res.locals.activePage = '/games';
  next();
}, gamesRoutes);

app.use('/genres', (req, res, next) => {
  res.locals.activePage = '/genres';
  next();
}, genresRoutes);

app.use('/editors', (req, res, next) => {
  res.locals.activePage = '/editors';
  next();
}, editorsRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

module.exports = app;
