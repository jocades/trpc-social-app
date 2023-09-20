import { Use } from '@/types/util'

import { auth } from '../auth'
import { db } from '../db'

export async function createTRPCContext() {
  const session = await auth()

  return {
    db,
    session,
  }
}

export type Context = Use<typeof createTRPCContext>
