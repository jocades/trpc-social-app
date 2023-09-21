import { relations } from 'drizzle-orm'
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

import { users } from './user.schema'

/* export const posts = sqliteTable('post', {
  id: int('id').primaryKey(),
  authorId: text('user_id'),
  content: text('content').notNull(),
  createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
}) */

// migrate to pg
export const posts = pgTable(
  'post',
  {
    id: serial('id').primaryKey(),
    authorId: text('user_id').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (post) => ({
    authorIdx: uniqueIndex('author_idx').on(post.authorId),
  })
)

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  likes: many(likes),
  comments: many(comments),
}))

export type Post = typeof posts.$inferSelect
export type InsertPost = typeof posts.$inferInsert

/* export const likes = sqliteTable('like', {
  id: int('id').primaryKey(),
  userId: text('user_id'),
  postId: int('post_id'),
}) */

// migrate to pg
export const likes = pgTable(
  'like',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    postId: integer('post_id').notNull(),
  },
  (like) => ({
    userPostIdx: uniqueIndex('user_post_idx').on(like.userId, like.postId),
  })
)

export const likeRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
}))

export type Like = typeof likes.$inferSelect
export type InsertLike = typeof likes.$inferInsert

/* export const comments = sqliteTable('comment', {
  id: int('id').primaryKey(),
  authorId: text('user_id'), // userId is str -> next-auth and drizzle adapter,
  postId: int('post_id'),
  content: text('content').notNull(),
  createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
}) */

// migrate to pg
export const comments = pgTable(
  'comment',
  {
    id: serial('id').primaryKey(),
    authorId: text('user_id').notNull(),
    postId: integer('post_id').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (comment) => ({
    authorPostIdx: uniqueIndex('author_post_idx').on(
      comment.authorId,
      comment.postId
    ),
  })
)

export const commentRelations = relations(comments, ({ one }) => ({
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
