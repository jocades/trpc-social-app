import { redirect } from 'next/navigation'

import { NavBar } from '@/components/nav-bar'
import { auth } from '@/server/auth'

import { SignOutButton } from './signout-btn'
import { WhoAmI } from './whoami'
import { WhoAmIWithTRPC } from './whoami-trpc'

export default async function PrivatePage() {
  async function whoAmI() {
    'use server'
    const session = await auth()

    if (!session?.user) {
      redirect('/sign-in?next=/user')
    }

    return session.user
  }

  return (
    <>
      <NavBar />
      <section className="flex flex-col space-y-4 container mx-auto pt-8">
        <h1 className="text-4xl">User Page</h1>
        <WhoAmI action={whoAmI} />
        <SignOutButton />
        <WhoAmIWithTRPC />
      </section>
    </>
  )
}
