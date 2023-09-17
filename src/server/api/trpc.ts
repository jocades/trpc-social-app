import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { Context } from './context'
import { TRPCPanelMeta } from 'trpc-panel'

const t = initTRPC.context<Context>().meta<TRPCPanelMeta>().create({
  transformer: superjson,
})

const authenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { session: ctx.session } })
})

const admin = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user.isAdmin) {
    throw new TRPCError({ code: 'FORBIDDEN' })
  }
  return next({ ctx })
})

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure
export const authProcedure = t.procedure.use(authenticated)
export const adminProcedure = t.procedure.use(authenticated).use(admin)
