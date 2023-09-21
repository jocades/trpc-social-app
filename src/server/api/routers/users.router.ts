import { eq } from 'drizzle-orm'

import { users } from '@/server/db/schema/user.schema'

import { Context } from '../context'
import { authProcedure, createTRPCRouter } from '../trpc'

function findByIdWithPosts(ctx: Context) {
  return ctx.db.query.users.findFirst({
    where: eq(users.id, ctx.session!.user.id!),
    with: {
      posts: true,
    },
  })
}

export const usersRouter = createTRPCRouter({
  me: authProcedure
    .meta({ description: 'Get the current user with its related posts' })
    .query(async ({ ctx }) => await findByIdWithPosts(ctx)),
})
