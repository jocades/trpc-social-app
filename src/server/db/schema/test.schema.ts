import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const tests = pgTable('tests', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
})
