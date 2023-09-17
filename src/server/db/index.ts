import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { schema } from './schema'

const sqlite = new Database('data.db')
export const db = drizzle(sqlite, { schema })

migrate(db, { migrationsFolder: 'drizzle' })
