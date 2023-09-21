import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { migrate } from 'drizzle-orm/vercel-postgres/migrator'

import { schema } from './schema'

export const db = drizzle(sql, { schema })

export function migratePostgres() {
  return migrate(db, {
    migrationsFolder: 'drizzle',
  })
}
