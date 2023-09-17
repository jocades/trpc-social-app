import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { users } from './users'

export const posts = sqliteTable('post', {
  id: integer('id').primaryKey(),
  authorId: text('user_id'),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
}))

export type Post = typeof posts.$inferSelect
export type InsertPost = typeof posts.$inferInsert

export const comments = sqliteTable('comment', {
  id: integer('id').primaryKey(),
  authorId: text('user_id'), // userId is str -> next-auth and drizzle adapter,
  postId: integer('post_id'),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const commentsRelations = relations(comments, ({ one }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}))

export type Comment = typeof comments.$inferSelect
export type InsertComment = typeof comments.$inferInsert
