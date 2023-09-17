import { type Config } from 'drizzle-kit'

export default {
  schema: './src/server/db/schema/*',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'data.db',
  },
} satisfies Config
