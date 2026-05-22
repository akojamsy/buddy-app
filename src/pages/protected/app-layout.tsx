import * as React from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { BellIcon, SearchIcon } from '@/assets/svg'
import { Button } from '#components/ui/button'
import { Input } from '#components/ui/input'
import { cn } from '@/lib/utils'
import { Bell, Plus } from 'lucide-react'

interface DashboardLayoutProps {
  pageTitle?: string | React.ReactNode
  //   breadcrumb?: Array<BreadcrumbItem>
  children: React.ReactNode
  className?: string
  /** Max-width wrapper for header + page content (e.g. dashboard cards) */
  contentClassName?: string
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
  contentClassName,
  innerClassName,
  showOwnHeader = true,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='flex h-screen min-h-0 min-w-0 flex-col overflow-hidden bg-[#F6F6F6] hidden_scroll font-lexend px-4 pt-6 sm:pl-8 sm:pr-6'>
        <div
          className={cn(
            'mx-auto flex min-h-0 w-full flex-1 flex-col',
            contentClassName,
          )}
        >
          <section
            id='Header'
            className='flex w-full min-w-0 items-center gap-4'
          >
            <div className='flex min-w-0 shrink items-center gap-2'>
              <SidebarTrigger className='md:hidden shrink-0' />
              <h1 className='truncate text-[1.563rem] font-bold text-[#3B3B45]'>
                {pageTitle ?? ''}
              </h1>
            </div>

            <div className='flex min-w-0 flex-1 items-center justify-end gap-4'>
              <Input
                type='search'
                placeholder='Search'
                aria-label='Search'
                leftIcon={{
                  icon: SearchIcon,
                  className: 'size-[24px] text-[#000F29] ml-1',
                }}
                wrapperClassName='hidden min-w-0 max-w-[422px] flex-1 sm:block'
                className='h-12 w-full max-w-[422px] rounded-[16px] border-0 bg-white pl-[50px] font-medium text-[#818187] leading-[137%] tracking-[0.02em] shadow-none placeholder:text-[#818187] focus-visible:border-0 focus-visible:ring-0'
              />

              <Button
                type='button'
                variant='ghost'
                size='icon'
                aria-label='Add'
                className='size-12 shrink-0 rounded-full bg-white hover:bg-[#F0F0F2]'
              >
                <Plus className='size-5 text-[#3B3B45]' strokeWidth={2} />
              </Button>

              <Button
                type='button'
                variant='ghost'
                size='icon'
                aria-label='Notifications'
                className='relative size-12 shrink-0 rounded-full bg-white hover:bg-[#F0F0F2]'
              >
                <BellIcon className='md:size-6 text-[#3B3B45]' />
                <span
                  aria-hidden
                  className='absolute top-3.5 right-3.5 size-2 rounded-full bg-[#FF3B30]'
                />
              </Button>
            </div>
          </section>
          <section
            className={cn(
              'min-h-0 flex-1 overflow-y-auto pt-8 pb-8',
              innerClassName,
            )}
          >
            {children}
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
