const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Genres existants
  const genres = [
    { name: "Action" },
    { name: "Aventure" },
    { name: "RPG" },
    { name: "Simulation" },
    { name: "Sport" },
    { name: "MMORPG" }
  ];

  // Ajout des genres
  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: {},
      create: genre,
    });
  }

  // Éditeurs de jeux
  const editors = [
    { 
      name: "Valve", 
      description: "Créateur de Steam et développeur de jeux emblématiques comme Half-Life, Counter-Strike et Portal" 
    },
    { 
      name: "Riot Games", 
      description: "Développeur de League of Legends, Valorant et autres jeux compétitifs" 
    }
  ];

  // Ajout des éditeurs
  for (const editor of editors) {
    await prisma.editor.upsert({
      where: { name: editor.name },
      update: {},
      create: {
        name: editor.name,
      },
    });
  }

  console.log('Seed terminée avec succès');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());