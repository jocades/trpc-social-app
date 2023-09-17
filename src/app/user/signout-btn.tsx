'use client'

import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export function SignOutButton() {
  return <Button onClick={() => signOut()}>Sign Out</Button>
}
