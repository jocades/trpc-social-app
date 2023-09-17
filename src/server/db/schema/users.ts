import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { posts } from './posts'

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
})

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
