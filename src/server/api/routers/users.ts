import { eq } from 'drizzle-orm'

import { users } from '@/server/db/schema/users'

import { Context } from '../context'
import { authProcedure, createTRPCRouter } from '../trpc'

function findById(ctx: Context) {
  return ctx.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, ctx.session.user.id!),
  })
}

function findByIdWithTodos(ctx: Context) {
  return ctx.db.query.users.findFirst({
    where: eq(users.id, ctx.session.user.id!),
    with: {
      posts: true,
    },
  })
}

export const usersRouter = createTRPCRouter({
  me: authProcedure
    .meta({ description: 'Get the current user with its related todos' })
    .query(async ({ ctx }) => await findByIdWithTodos(ctx)),
})
