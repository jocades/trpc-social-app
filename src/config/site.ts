export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'AnotherSocialApp',
  description: 'Site description',
  mainNav: [
    {
      title: 'User',
      href: '/user',
    },
  ],
  links: {
    portfolio: 'https://jocades.dev',
    github: 'https://github.com/jocades/trpc-social-app',
  },
}
