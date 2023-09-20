import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { TRPCPanelMeta } from 'trpc-panel'

import { Context } from './context'

const t = initTRPC.context<Context>().meta<TRPCPanelMeta>().create({
  transformer: superjson,
})

const authenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { session: ctx.session } }) // infer non null session
})

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure
export const authProcedure = t.procedure.use(authenticated)
export const adminProcedure = t.procedure.use(authenticated)
