import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import UserAuthForm from '@/components/forms/sign-in'
import { auth } from '@/server/auth'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Login or create an account',
}

interface AuthenticationPageProps {
  searchParams: { next?: string }
}

export default async function AuthenticationPage({
  searchParams: { next },
}: AuthenticationPageProps) {
  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm callbackUrl={next} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
