import { desc } from 'drizzle-orm'
import { z } from 'zod'

import { comments, posts } from '@/server/db/schema/post.schema'

import { authProcedure, createTRPCRouter, publicProcedure } from '../trpc'

export const postsRouter = createTRPCRouter({
  create: authProcedure
    .meta({ description: 'Create a post' })
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db
        .insert(posts)
        .values({
          authorId: ctx.session.user.id,
          content: input.content,
          createdAt: new Date(),
        })
        .returning()

      return post
    }),

  list: publicProcedure
    .meta({ description: 'List all posts' })
    .input(
      z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
      })
    )
    .query(async ({ ctx, input: { limit = 10, offset } }) => {
      return await ctx.db.query.posts.findMany({
        limit: limit + 1,
        offset,
        orderBy: [desc(posts.createdAt), desc(posts.id)],
        with: {
          author: {
            columns: {
              id: true,
              name: true,
              image: true,
            },
          },
          comments: {
            orderBy: [desc(comments.createdAt), desc(comments.id)],
          },
          likes: true,
        },
      })
    }),
})
