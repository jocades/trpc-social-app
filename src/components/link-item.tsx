'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NavItem } from '@/types/nav'
import { cn } from '@/lib/utils'

interface LinkItemProps {
  item: NavItem
}

const LinkItem = ({ item }: LinkItemProps) => {
  const path = usePathname()
  const active = path === item.href

  return (
    <Link
      href={item.disabled ? path : item.href}
      className={cn(
        'flex items-center text-lg font-semibold text-muted-foreground sm:text-sm hover:text-primary',
        active && 'text-primary',
        item.disabled &&
          'cursor-not-allowed opacity-80 hover:text-muted-foreground'
      )}
    >
      {item.title}
    </Link>
  )
}

export default LinkItem
