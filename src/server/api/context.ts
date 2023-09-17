import { Use } from '@/types/util'

import { auth } from '../auth'
import { db } from '../db'

export async function createTRPCContext() {
  const session = await auth()

  return {
    db,
    session: {
      ...session,
      user: {
        ...session?.user,
        isAdmin: true,
      },
    },
  }
}

export type Context = Use<typeof createTRPCContext>
