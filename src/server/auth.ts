import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth, {
  AuthOptions,
  getServerSession,
  type DefaultSession,
} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

import { db } from './db'

declare module 'next-auth' {
  interface Session {
    // extend the session with custom properties
    user: {
      id: string
    } & DefaultSession['user']
  }
}

const options = {
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
} satisfies AuthOptions

export function auth() {
  return getServerSession(options)
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }
