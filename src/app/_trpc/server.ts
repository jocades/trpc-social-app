import { type AppRouter } from '@/server/api'
import { httpBatchLink } from '@trpc/client'
import { experimental_createTRPCNextAppDirServer as createTRPCNextAppDirServer } from '@trpc/next/app-dir/server'
import superjson from 'superjson'

/**
 * TRPC system that can be called from anywhere (server to server),
 * not only the react client.
 */
export const server = createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
        }),
      ],
    }
  },
})
