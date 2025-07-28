import { PrismaClient } from '@prisma/client';

export const extendedPrismaClient = new PrismaClient();

export type ExtendedPrismaClient = typeof extendedPrismaClient;
