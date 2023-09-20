'use client'

import { api } from '@/app/_trpc/client'

import { PostItem } from './post-item'

export function PostsList() {
  const { data: posts, isLoading } = api.posts.list.useQuery({})

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}
