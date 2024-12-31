import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// biome-ignore lint/suspicious/noRedeclare: <explanation>
const prisma = globalThis.prisma ?? prismaClientSingleton();

globalThis.prisma = prisma;

export { prisma as db };
