import * as React from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Bell, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
// import { useAppSelector } from '@/redux/store'
// import type { RootState } from '@/redux/features/root-reducer'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface DashboardLayoutProps {
  pageTitle?: string | React.ReactNode
  //   breadcrumb?: Array<BreadcrumbItem>
  children: React.ReactNode
  className?: string
  innerClassName?: string
  onClick?: () => void
  onClickText?: string
  icon?: React.ReactNode
  showOwnHeader?: boolean
}

export default function DashboardLayout({
  pageTitle,
  //   breadcrumb,
  onClick,
  onClickText,
  icon,
  children,
  className,
  innerClassName,
  showOwnHeader = true,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='bg-gray-50 h-screen overflow-y-auto hidden_scroll'>
        <section
          id='Header'
          className='w-full flex p-6 px-4 sm:px-6 justify-between border-b-2 border-gray-200'
        >
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='md:hidden' />
            <h1 className='text-lg font-medium'>Hello, {'Daniel'}</h1>
          </div>

          <div id='notifications-profile' className='flex gap-2'>
            <span
              className='rounded-full bg-gray-200 p-2 cursor-pointer'
              aria-description='Notifications'
              aria-roledescription='Notifications'
            >
              <Bell className='w-4 h-4 text-black' />
            </span>

            <Avatar className='h-8 w-8 rounded-full cursor-pointer'>
              <AvatarImage src={''} alt={'uyg'} />
              <AvatarFallback className='rounded-lg bg-gray-200'>
                JL
              </AvatarFallback>
            </Avatar>
          </div>
        </section>

        {showOwnHeader && (
          <section
            className={cn(
              'p-4 sm:p-6 flex items-center justify-between',
              className,
            )}
          >
            <div>
              {pageTitle ? <h1 className='SFPro text-2xl'>{pageTitle}</h1> : ''}
            </div>

            <div>
              {onClickText && (
                <Button variant='outline' onClick={onClick}>
                  {icon}
                  <span className='text-sm ml-2'>{onClickText}</span>
                </Button>
              )}
            </div>

            <div className=' items-center gap-1.5 cursor-pointer hidden lg:fle'>
              <img
                src='https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/91/914ba47874e675167658078508781e39b3984f5c_full.jpg'
                alt='avatar'
                className='w-[32px] h-[32px] p-1 rounded-full border border-[#6366F1]'
              />
              <ChevronDown className='size-4 text-[#868787]' />
            </div>
          </section>
        )}

        <section className={cn('p-4 sm:px-6', innerClassName)}>
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  )
}
