import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

import { posts } from './post.schema'

export const users = pgTable(
  'user',
  {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
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
