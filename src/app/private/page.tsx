import { redirect } from 'next/navigation'

import { auth } from '@/auth'

export default async function PrivatePage() {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <section className="flex flex-col space-y-4 mt-8 mx-auto">
      <h1 className="text-4xl">Private Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  )
}
