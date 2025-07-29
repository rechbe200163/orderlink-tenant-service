import { PrismaClient } from '@prisma/client';
export declare const extendedPrismaClient: PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export type ExtendedPrismaClient = typeof extendedPrismaClient;
