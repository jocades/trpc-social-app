'use client'

import { type BuiltInProviderType } from 'next-auth/providers/index'
import { signIn, signOut } from 'next-auth/react'

import { Button, ButtonProps } from './ui/button'

interface SignInProps extends ButtonProps {
  provider: BuiltInProviderType
  callbackUrl?: string
}

export function SignIn({ provider, callbackUrl, ...props }: SignInProps) {
  return (
    <Button onClick={() => signIn(provider, { callbackUrl })} {...props}>
      Sign In
    </Button>
  )
}

export function SignOut(props?: ButtonProps) {
  return (
    <button onClick={() => signOut()} {...props}>
      Sign Out
    </button>
  )
}
