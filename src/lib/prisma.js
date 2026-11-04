import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url:
          process.env.DATABASE_URL ||
          'postgresql://postgres.tzwoufloqfcjtnarbrtl:yWXZCRIK7Hif8bNc@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require',
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
