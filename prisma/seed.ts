import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const FAKE_USERS_LENGTH = 10;
const FAKE_TASKS_LENGTH_PER_USER = 5;
const FAKE_USERS_PASSWORD = "passfake";

async function main() {
  Array.from(Array(FAKE_USERS_LENGTH)).forEach(async () => {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: FAKE_USERS_PASSWORD,
        tasks: {
          create: {
            title: faker.lorem.text(7),
            description: faker.lorem.words(
              faker.datatype.number({ min: 7, max: 16 })
            ),
          },
        },
      },
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
