import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { z } from 'zod'

import { usersRouter } from './routers/users'
import { authProcedure, createTRPCRouter, publicProcedure } from './trpc'

export const appRouter = createTRPCRouter({
  ping: publicProcedure.query(() => 'pong'),
  admin: authProcedure.query(({ ctx }) => {
    console.log(ctx.session.user.id)
    return 'admin'
  }),
  users: usersRouter,
})

export type AppRouter = typeof appRouter

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>

/**
 * Function to create a generic REST-like TRPC handler
 * - List: GET /api/trpc/todos
 * - Create: POST /api/trpc/todos
 * - Read: GET /api/trpc/todos/:id
 * - Update: POST /api/trpc/todos/:id
 * - Delete: DELETE /api/trpc/todos/:id
 */
function createRestRouter<T extends z.ZodTypeAny>(schema: T) {}
