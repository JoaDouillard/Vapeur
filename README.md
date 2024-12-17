Bien sûr, voici le README.md modifié pour ajouter les étapes de création des dossiers "images" et "games" :

### **ENGLISH README.md**
### **Created by Joachim Douillard and Mathis Ciochetto**

# **Vapeur**  

**Project Vapeur** is a web application inspired by the management of video game collections, much like what **Steam** does, with its name meaning "vapor." Just as steam powers machines, our project aims to be the engine for organizing your games efficiently. With **Vapeur**, users can classify, view, modify, and expand their game collection while navigating a structured and intuitive environment.

This guide will help you set up the **Vapeur** project using **Express.js**, **Prisma**, **Handlebars**, and **Multer**. Follow these steps to launch the project on your local machine.

---

## **Prerequisites**

Before starting, ensure the following are pre-installed:

- [Node.js](https://nodejs.org/)  
- [npm](https://www.npmjs.com/)

---

## **Installation**

1. **Clone the Git repository**:

   ```bash
   git clone <REPO_URL>
   cd Vapeur
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** at the root of the project to configure environment variables:

   ```env
   DATABASE_URL="file:./prisma/database.db"
   ```

4. **Create required directories**:

   - Create the `images` directory inside `public`:

     ```bash
     mkdir -p public/images
     ```

   - Create the `games` directory inside `images`:

     ```bash
     mkdir -p public/images/games
     ```

5. **Configure Prisma**:

   - Initialize the database and apply migrations:

     ```bash
     npx prisma migrate dev --name init
     ```

   - Seed the database with default genres and publishers:

     ```bash
     npm run seed
     ```

6. **Start the server**:

   ```bash
   npm start
   ```

7. **Access the application** in your browser:

   ```
   http://localhost:3000
   ```

---

## **Useful Commands**

| Command                              | Description                                            |
|--------------------------------------|--------------------------------------------------------|
| `git clone <REPO_URL>`               | Clone the repository to your local machine.            |
| `cd Vapeur`                          | Navigate to the project directory.                     |
| `npm install`                        | Install all project dependencies.                      |
| `npx prisma migrate dev --name init` | Apply Prisma migrations to set up the database.        |
| `npm run seed`                       | Seed the database with initial data (genres, editors). |
| `npm start`                          | Start the server and launch the application.           |

---

## **Site Structure**

```
vapeur/
├── prisma/
│   ├── database.bd                       # SQLite database file
│   ├── schema.prisma                     # Prisma database schema
│   └── seed.js                           # Script to populate the database
├── public/
│   ├── css/
│   │   └── style.css                     # Main CSS stylesheet
│   ├── images\games/                     # Directory for game images
│   └── js/
│       └── script.js                     # Front-end scripts
├── src/
│   ├── controllers/
│   │   ├── editorsController.js          # Controller for editors
│   │   ├── gamesController.js            # Controller for games
│   │   └── genresController.js           # Controller for genres
│   ├── routes/
│   │   ├── editors.js                    # Routes for editors
│   │   ├── games.js                      # Routes for games
│   │   ├── genres.js                     # Routes for genres
│   │   └── prismaClient.js               # Prisma client configuration
├── views/
│   ├── games/
│   │   ├── createGame.hbs                # View for creating a game
│   │   └── editGame.hbs                  # View for editing a game
│   ├── layouts/
│   │   └── main.hbs                      # Main Handlebars layout
│   ├── partials/
│   │   ├── footer.hbs                    # Common footer
│   │   ├── header.hbs                    # Common header
│   │   ├── editors.hbs                   # Partial view for editors
│   │   ├── games.hbs                     # Partial view for games
│   │   ├── genres.hbs                    # Partial view for genres
│   │   └── index.hbs                     # Partial view for homepage
├── .env                                  # Environment variables
├── .gitignore                            # Files ignored by Git
├── package-lock.json                     # Dependency lock file
├── package.json                          # Node.js dependencies
├── README.md                             # Project documentation
└── server.js                             # Server entry point
```


### **README.md EN FRANÇAIS**  
### **Créé par Joachim Douillard et Mathis Ciochetto**

# **Vapeur**  

**Projet Vapeur** est une application web inspirée par la gestion de collections de jeux vidéo, similaire à ce que propose **Steam**, avec un nom signifiant "vapeur". Tout comme la vapeur alimente les machines, notre projet vise à être le moteur pour organiser efficacement votre collection de jeux. Avec **Vapeur**, les utilisateurs peuvent classer, visualiser, modifier et enrichir leur collection de jeux tout en naviguant dans un environnement structuré et intuitif.

Ce guide vous aidera à configurer le projet **Vapeur** en utilisant **Express.js**, **Prisma**, **Handlebars** et **Multer**. Suivez ces étapes pour lancer le projet sur votre machine locale.

---

## **Prérequis**

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- [Node.js](https://nodejs.org/)  
- [npm](https://www.npmjs.com/)

---

## **Installation**

1. **Cloner le dépôt Git** :

   ```bash
   git clone <REPO_URL>
   cd Vapeur
   ```

2. **Installer les dépendances** :

   ```bash
   npm install
   ```

3. **Créer un fichier `.env`** à la racine du projet pour configurer les variables d'environnement :

   ```env
   DATABASE_URL="file:./prisma/database.db"
   ```

4. **Créer les répertoires nécessaires** :

   - Créer le répertoire `images` dans `public` :

     ```bash
     mkdir -p public/images
     ```

   - Créer le répertoire `games` dans `images` :

     ```bash
     mkdir -p public/images/games
     ```

5. **Configurer Prisma** :

   - Initialiser la base de données et appliquer les migrations :

     ```bash
     npx prisma migrate dev --name init
     ```

   - Remplir la base de données avec des données initiales (genres et éditeurs) :

     ```bash
     npm run seed
     ```

6. **Démarrer le serveur** :

   ```bash
   npm start
   ```

7. **Accéder à l'application** dans votre navigateur :

   ```
   http://localhost:3000
   ```

---

## **Commandes Utiles**

| Commande                             | Description                                           |
|--------------------------------------|-------------------------------------------------------|
| `git clone <REPO_URL>`               | Cloner le dépôt sur votre machine locale.             |
| `cd Vapeur`                          | Se déplacer dans le répertoire du projet.             |
| `npm install`                        | Installer toutes les dépendances du projet.           |
| `npx prisma migrate dev --name init` | Appliquer les migrations Prisma pour créer la base.   |
| `npm run seed`                       | Remplir la base de données avec les données initiales.|
| `npm start`                          | Démarrer le serveur et lancer l'application.          |

---

## **Site Structure**

```
vapeur/
├── prisma/
│   ├── database.bd                       # Base de données SQLite
│   ├── schema.prisma                     # Schéma de la base de données Prisma
│   └── seed.js                           # Script pour remplir la base de données
├── public/
│   ├── css/
│   │   └── style.css                     # Feuille de style CSS principale
│   ├── images\games/                     # Répertoire des images de jeux
│   └── js/
│       └── script.js                     # Scripts front-end
├── src/
│   ├── controllers/
│   │   ├── editorsController.js          # Contrôleur pour les éditeurs
│   │   ├── gamesController.js            # Contrôleur pour les jeux
│   │   └── genresController.js           # Contrôleur pour les genres
│   ├── routes/
│   │   ├── editors.js                    # Routes pour les éditeurs
│   │   ├── games.js                      # Routes pour les jeux
│   │   ├── genres.js                     # Routes pour les genres
│   │   └── prismaClient.js               # Configuration du client Prisma
├── views/
│   ├── games/
│   │   ├── createGame.hbs                # Vue pour la création de jeux
│   │   └── editGame.hbs                  # Vue pour l'édition de jeux
│   ├── layouts/
│   │   └── main.hbs                      # Layout principal de Handlebars
│   ├── partials/
│   │   ├── footer.hbs                    # Footer commun
│   │   ├── header.hbs                    # Header commun
│   │   ├── editors.hbs                   # Vue partielle pour les éditeurs
│   │   ├── games.hbs                     # Vue partielle pour les jeux
│   │   ├── genres.hbs                    # Vue partielle pour les genres
│   │   └── index.hbs                     # Vue partielle pour la page d'accueil
├── .env                                  # Variables d'environnement
├── .gitignore                            # Fichiers ignorés par Git
├── package-lock.json                     # Fichier de verrouillage des dépendances
├── package.json                          # Dépendances Node.js
├── README.md                             # Documentation du projet
└── server.js                             # Point d'entrée du serveur
```