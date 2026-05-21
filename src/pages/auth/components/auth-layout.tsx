import { BuddyFullLogo, MessageCircleIcon } from '@/assets/svg'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { FeatureList } from './feature-list'
import { cn } from '#lib/utils'

type AuthLayoutProps = {
  children: ReactNode
}

function AuthSidebar({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col mt-[7.938rem]', className)}>
      <div className='flex flex-1 flex-col justify-center px-8 lg:px-16'>
        <FeatureList />
      </div>

      <footer className='px-8 pb-8 mt-24 text-[0.813rem] text-[#A0A0AB] lg:px-16 lg:pb-10'>
        © {new Date().getFullYear()} Revvex. All rights reserved
      </footer>
    </div>
  )
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='relative flex min-h-svh flex-col lg:flex-row'>
      <aside className='flex w-full flex-col bg-[#F8FAFC] lg:bg-white lg:min-h-svh lg:w-1/2 lg:pl-[7.063rem]'>
        <header className='pb-0 pt-8 sm:pt-12 flex justify-center lg:justify-start lg:px-16 lg:pt-[5.563rem]'>
          <BuddyFullLogo className='h-9 w-auto' aria-label='Buddy' />
        </header>
        <AuthSidebar className='hidden lg:flex' />
      </aside>

      <main className='relative flex w-full flex-1 items-center justify-center bg-[#F8FAFC] px-6 py-8 sm:pt-0 lg:py-12 lg:min-h-svh lg:w-1/2 lg:px-10'>
        {children}
      </main>

      <AuthSidebar className='flex lg:hidden' />

      <motion.div
        role='button'
        tabIndex={0}
        className='fixed right-6 bottom-6 z-10 flex w-fit cursor-pointer items-center gap-2 rounded-[60.71px] bg-[#FF8600] p-[15px] text-sm font-medium text-white shadow-[0_4px_14px_rgba(255,134,0,0.35)]'
        whileHover={{ y: -4, backgroundColor: '#E67800' }}
        whileTap={{ y: -2, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <span className='text-[13px] font-medium leading-[19px] tracking-[-0.0045em]'>
          Get Help
        </span>
        <MessageCircleIcon className='size-4.5' />
      </motion.div>
    </div>
  )
}
