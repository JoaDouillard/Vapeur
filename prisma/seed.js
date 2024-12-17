const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const genres = [
    { name: "Action" },
    { name: "Aventure" },
    { name: "RPG" },
    { name: "Simulation" },
    { name: "Sport" },
    { name: "MMORPG" }
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: {},
      create: genre,
    });
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
