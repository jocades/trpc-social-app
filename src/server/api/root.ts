import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { postsRouter } from './routers/posts.router'
import { usersRouter } from './routers/users.router'
import { authProcedure, createTRPCRouter, publicProcedure } from './trpc'

export const appRouter = createTRPCRouter({
  ping: publicProcedure.query(() => 'pong'),
  admin: authProcedure.query(({ ctx }) => {
    console.log(ctx.session.user.id)
    return 'admin'
  }),
  users: usersRouter,
  posts: postsRouter,
})

export type AppRouter = typeof appRouter

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
