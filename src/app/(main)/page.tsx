import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PostForm } from '@/components/forms/post-form'
import { auth } from '@/server/auth'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const session = await auth()

  if (!session?.user) {
    redirect('/sign-in?next=/')
  }

  return (
    <section className="container mx-auto pt-8">
      <PostForm user={session.user} />
    </section>
  )
}
