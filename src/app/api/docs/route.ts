import { appRouter } from '@/server/api'
import { renderTrpcPanel } from 'trpc-panel'

function handler() {
  return new Response(
    renderTrpcPanel(appRouter, {
      url: 'http://localhost:3000/api/trpc',
      transformer: 'superjson',
    }),
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}

export { handler as GET, handler as POST }
