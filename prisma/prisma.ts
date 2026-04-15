import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const prismaClientSingleton = () => {
  // 1. Create a standard pg connection pool
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  
  // 2. Wrap it in the Prisma Adapter
  const adapter = new PrismaPg(pool)

  // 3. Pass the adapter to the client (no datasourceUrl needed!)
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma