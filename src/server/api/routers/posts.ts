import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { posts } from '@/server/db/schema/posts'

import { Context } from '../context'
import { authProcedure, createTRPCRouter } from '../trpc'

export const postsRouter = createTRPCRouter({
  create: authProcedure
    .meta({ description: 'Create a post' })
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        authorId: ctx.session.user.id,
        content: input.content,
        createdAt: new Date(),
      })
    }),
})
