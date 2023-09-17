import Link from 'next/link'

import { NavItem } from '@/types/nav'
import { siteConfig } from '@/config/site'
import { cn, size } from '@/lib/utils'
import { Icons } from '@/components/icons'

import LinkItem from './link-item'

interface MainNavProps {
  items?: NavItem[]
}

export const MainNav = ({ items }: MainNavProps) => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.apple className={cn(size(6))} />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, i) => (
            <LinkItem key={i} item={item} />
          ))}
        </nav>
      ) : null}
    </div>
  )
}
