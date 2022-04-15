import { Prisma, PrismaClient } from "@prisma/client";

export let prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

export default function initDatabase(cb: () => void) {
  prisma = new PrismaClient();
  prisma
    .$connect()
    .then(() => {
      cb();
    })
    .catch((err) => {
      console.log("Error: db connection failed!");
      console.log(err);
    })
    .finally(() => prisma.$disconnect());
}
