import { Metadata } from 'next'

import { PostForm } from '@/components/posts/post-form'
import { PostsList } from '@/components/posts/posts-list'
import { auth } from '@/server/auth'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const session = await auth('/')

  return (
    <section className="container max-w-[600px] pt-8">
      <PostForm user={session!.user} />
      <PostsList />
    </section>
  )
}
