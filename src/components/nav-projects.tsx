'use client'

import {
  DollarCircleIcon,
  MessageIcon,
  PersonIcon,
  PersonsIcon,
  SettingsIcon,
  ThreadIcon,
} from '@/assets/svg'
import { cn } from '@/lib/utils'
import routesPath from '@/utils/routes-path'
import type { ComponentType, SVGProps } from 'react'
import { NavLink } from 'react-router-dom'

type NavIcon = ComponentType<SVGProps<SVGSVGElement>>

const NAV_ITEMS: {
  name: string
  url: string
  icon: NavIcon
}[] = [
  {
    name: 'My Portfolio',
    url: routesPath.DASHBOARD,
    icon: PersonIcon,
  },
  {
    name: 'My Group',
    url: routesPath.MY_GROUP,
    icon: PersonsIcon,
  },
  {
    name: 'Messages',
    url: routesPath.MESSAGES,
    icon: MessageIcon,
  },
  {
    name: 'Analytics',
    url: routesPath.ANALYTICS,
    icon: ThreadIcon,
  },
  {
    name: 'Pack',
    url: routesPath.PACK,
    icon: DollarCircleIcon,
  },
  {
    name: 'Settings',
    url: routesPath.SETTINGS,
    icon: SettingsIcon,
  },
]

export function NavProjects() {
  return (
    <nav className='flex flex-col gap-2 px-[1.563rem]'>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.name}
          to={item.url}
          end={item.url === routesPath.DASHBOARD}
          className={({ isActive }) =>
            cn('group/nav-item relative block', isActive && 'is-active')
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span
                  aria-hidden
                  className='absolute left-[-25px] top-1/2 h-8 w-1.5 -translate-y-1/2 rounded-r-[4px] bg-[#FF8600]'
                />
              )}
              <span
                className={cn(
                  'flex items-center text-sm font-medium transition-colors duration-300 ease-in-out',
                  isActive
                    ? 'gap-2 rounded-[16px] bg-white px-8 py-[15.7px] text-[#FF8600] shadow-[0_4px_58px_0_rgba(0,0,0,0.07)]'
                    : 'gap-2 px-8 py-[15.7px] text-[#818187] group-hover/nav-item:text-[#FF8600]',
                )}
              >
                <item.icon
                  className={cn(
                    'shrink-0 transition-colors duration-300 ease-in-out',
                    isActive
                      ? 'text-[#FF8600]'
                      : 'text-[#818187] group-hover/nav-item:text-[#FF8600]',
                  )}
                />
                <span className='text-sm font-normal tracking-wide'>
                  {item.name}
                </span>
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
