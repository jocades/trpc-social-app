import { Metadata } from 'next'

import { PostForm } from '@/components/feed/post-form'
import { PostsList } from '@/components/feed/posts-list'
import { auth } from '@/server/auth'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const session = await auth('/')

  return (
    <section className="container mx-auto pt-8">
      <PostForm user={session!.user} />
      <PostsList />
    </section>
  )
}
