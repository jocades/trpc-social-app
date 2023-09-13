'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/icons'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  callbackUrl?: string
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'Password must be at least 5 characters'),
  // firstName: z.string().min(2, 'First name must be at least 2 characters'),
  // lastName: z.string().min(2, 'Last name must be at least 2 characters'),
})

const UserAuthForm = ({
  className,
  callbackUrl,
  ...props
}: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: '',
      /*       firstName: '',
      lastName: '', */
    },
    resolver: zodResolver(formSchema),
  })

  async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    setIsLoading(true)
    signIn('credentials', {
      email,
      password,
      callbackUrl,
    })

    setIsLoading(false)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="grid gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        placeholder="name@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="current-password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        placeholder="password.."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        autoComplete="given-name"
                        autoCapitalize="none"
                        autoCorrect="off"
                        placeholder="First Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        autoComplete="family-name"
                        autoCapitalize="none"
                        autoCorrect="off"
                        placeholder="Last Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <Button
                type="submit"
                className="mt-1"
                disabled={isLoading}
                loading={isLoading}
              >
                Sign In with Email
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          setIsLoading(true)
          signIn('github', { callbackUrl })
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        Github
      </Button>
    </div>
  )
}

export default UserAuthForm
