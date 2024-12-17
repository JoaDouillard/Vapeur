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

// Configuration de Handlebars avec le helper "eq"
const hbs = engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  defaultLayout: 'main',
  helpers: {
    eq: (a, b) => a === b // Helper pour comparer deux valeurs
  }
});

app.engine('hbs', hbs);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/games', gamesRoutes);
app.use('/genres', genresRoutes);
app.use('/editors', editorsRoutes);

// Page d'accueil avec quelques jeux en vedette
app.get('/', async (req, res) => {
  try {
    const featuredGames = await prisma.game.findMany({
      take: 6,
      include: {
        genre: true,
        editor: true
      }
    });
    res.render('index', { 
      title: 'Accueil', 
      games: featuredGames 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
