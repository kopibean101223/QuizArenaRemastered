const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const docs = await prisma.syllabusDoc.findMany({
      orderBy: { id: 'desc' },
      take: 1
    });
    console.log('Docs success:', docs);
    
    const questions = await prisma.generatedQuestion.findMany({
      orderBy: { id: 'desc' },
      include: { choices: true, citation: true },
      take: 1
    });
    console.log('Questions success:', questions);
  } catch (e) {
    console.error('Prisma Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
