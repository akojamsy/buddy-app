'use client'

import * as React from 'react'

import { NavProjects } from '#components/nav-projects'
import { NavUser } from '#components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '#components/ui/sidebar'
import { selectNavUserName } from '@/redux/features/auth/authSlice'
import { useAppSelector } from '@/redux/store'
import { BuddyFullLogo } from '@/assets/svg'

const SIDEBAR_USER_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=144&h=144&fit=crop&crop=face'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const name = useAppSelector(selectNavUserName)

  return (
    <Sidebar
      collapsible='icon'
      className='border-r-0 group-data-[side=left]:border-r-0 bg-[#F9F9F9] font-lexend [--sidebar:#FFFFFF]'
      {...props}
    >
      <SidebarHeader className='flex justify-center items-center pt-7 pb-10'>
        <BuddyFullLogo />
      </SidebarHeader>
      <SidebarContent className='px-0'>
        <NavProjects />
      </SidebarContent>
      <SidebarFooter className='p-0'>
        <NavUser
          user={{
            name,
            role: 'Influencer',
            avatar: SIDEBAR_USER_AVATAR,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
