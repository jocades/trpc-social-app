'use client'

import { api } from '../_trpc/client'

export function WhoAmIWithTRPC() {
  const { data: user, refetch, error } = api.users.me.useQuery()

  return (
    <div className="space-y-2">
      <button onClick={() => refetch()}>Who Am I with TRPC?</button>
      {user?.image && (
        <span>
          <img
            src={user.image}
            alt={user.name!}
            className="w-16 h-16 rounded-full"
          />
        </span>
      )}
      {user && (
        <pre className="rounded border p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
    </div>
  )
}
