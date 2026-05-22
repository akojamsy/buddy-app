import { TelescopeIcon } from '@/assets/svg'
import { cn } from '#lib/utils'
import type { ReactNode } from 'react'

export type StatCardProps = {
  value: string | number
  label: string
  icon?: ReactNode
  className?: string
  valueClassName?: string
  labelClassName?: string
  iconContainerClassName?: string
  iconClassName?: string
}

export function StatCard({
  value,
  label,
  icon,
  className,
  valueClassName,
  labelClassName,
  iconContainerClassName,
  iconClassName,
}: StatCardProps) {
  return (
    <article
      className={cn(
        'flex w-full min-w-0 items-center justify-between gap-4 rounded-[12px] bg-white pl-4 pr-5 py-4',
        className,
      )}
    >
      <div className='flex min-w-0 flex-col'>
        <p
          className={cn(
            'text-[1.56rem] font-bold leading-[133%] tracking-normal text-[#3B3B45]',
            valueClassName,
          )}
        >
          {value}
        </p>
        <p
          className={cn(
            'text-xs font-normal leading-[137%] tracking-[2%] text-[#A3A3A6]',
            labelClassName,
          )}
        >
          {label}
        </p>
      </div>

      <div
        className={cn(
          'flex size-12 shrink-0 items-center justify-center rounded-full bg-[#E6F9F6]',
          iconContainerClassName,
        )}
        aria-hidden
      >
        {icon ?? (
          <TelescopeIcon
            className={cn('size-5 text-[#00C49F]', iconClassName)}
          />
        )}
      </div>
    </article>
  )
}
