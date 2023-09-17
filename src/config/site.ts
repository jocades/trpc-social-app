export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'j0rdiC',
  description: 'Site description',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'User',
      href: '/user',
    },
  ],
  links: {
    portfolio: 'https://jocades.dev',
    github: 'https://github.com/jocades',
  },
}
