// prisma.config.ts
import { defineConfig } from 'prisma/config';
import * as dotenv from 'dotenv';
import path from 'node:path';


dotenv.config({ path: path.join(process.cwd(), '.env.local') });

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    
    url: process.env.DATABASE_URL,
  },
});