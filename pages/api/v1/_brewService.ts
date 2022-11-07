import { Brew, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLatestBrew = async (): Promise<Brew | null> => {
  return prisma.brew.findFirst({
    orderBy: {
      dateTime: "desc",
    },
    take: 1,
  });
};

export const getAllBrews = async (): Promise<Brew[]> => {
  return await prisma.brew.findMany();
};

export const createBrew = async (fact: string): Promise<Brew> => {
  return prisma.brew.create({
    data: {
      dateTime: new Date(),
      fact,
    },
  });
};
