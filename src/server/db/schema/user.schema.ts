import { relations } from 'drizzle-orm'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

import { posts } from './post.schema'

export const users = sqliteTable(
  'user',
  {
    id: text('id').notNull().primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
    image: text('image'),
  },
  (user) => ({
    emailIdx: uniqueIndex('email_idx').on(user.email),
  })
)

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
