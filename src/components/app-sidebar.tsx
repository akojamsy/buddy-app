'use client'

import * as React from 'react'

import { NavProjects } from '#components/nav-projects'
import { NavUser } from '#components/nav-user'
import { TeamSwitcher } from '#components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '#components/ui/sidebar'
import {
  GalleryVerticalEndIcon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
} from 'lucide-react'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: <GalleryVerticalEndIcon />,
      plan: 'Enterprise',
    },
  ],
  projects: [
    {
      name: 'My Portfolio',
      url: '#',
      icon: <FrameIcon />,
    },
    {
      name: 'My Group',
      url: '#',
      icon: <PieChartIcon />,
    },
    {
      name: 'Messages',
      url: '#',
      icon: <MapIcon />,
    },
    {
      name: 'Analytics',
      url: '#',
      icon: <MapIcon />,
    },
    {
      name: 'Pack',
      url: '#',
      icon: <MapIcon />,
    },
    {
      name: 'Settings',
      url: '#',
      icon: <MapIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
