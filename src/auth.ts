import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export { getServerSession as auth } from 'next-auth'

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }
