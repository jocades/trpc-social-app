import {
  createTRPCReact,
  unstable_httpBatchStreamLink as httpBatchStreamLink,
  loggerLink,
} from '@trpc/react-query'
import superjson from 'superjson'

import { type AppRouter } from '@/server/api'

export const api = createTRPCReact<AppRouter>({})

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function createTRPCClient() {
  return api.createClient({
    transformer: superjson,
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === 'development' ||
          (opts.direction === 'down' && opts.result instanceof Error),
      }),
      httpBatchStreamLink({
        url: getBaseUrl() + '/api/trpc',
        headers: {
          'x-trpc-source': 'web',
        },
      }),
    ],
  })
}
