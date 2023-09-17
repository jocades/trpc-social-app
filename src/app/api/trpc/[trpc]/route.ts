import { appRouter } from '@/server/api'
import { createTRPCContext } from '@/server/api'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

function handler(req: Request) {
  return fetchRequestHandler({
    req,
    endpoint: '/api/trpc',
    router: appRouter,
    createContext: createTRPCContext,
  })
}

export { handler as GET, handler as POST }
