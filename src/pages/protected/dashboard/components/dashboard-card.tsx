import { cn } from '#lib/utils'
import type { ReactNode } from 'react'

type DashboardCardProps = {
  title: string
  action?: ReactNode
  children: ReactNode
  className?: string
  headerClassName?: string
}

export function DashboardCard({
  title,
  action,
  children,
  className,
  headerClassName,
}: DashboardCardProps) {
  return (
    <section
      className={cn(
        'w-full min-w-0 rounded-[12px] bg-white p-5 sm:p-6',
        className,
      )}
    >
      <div
        className={cn(
          'mb-5 flex flex-wrap items-center justify-between gap-3',
          headerClassName,
        )}
      >
        <h2 className='text-lg md:text-xl font-bold text-[#3B3B45]'>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
