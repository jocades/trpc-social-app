'use client'

import { api } from '@/app/_trpc/client'

export function PostsList() {
  const { data, isLoading } = api.posts.list.useQuery({})

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
