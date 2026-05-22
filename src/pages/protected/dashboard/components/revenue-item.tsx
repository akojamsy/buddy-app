import { FacebookIcon, InstagramIcon, LinkedInIcon } from '@/assets/svg'
import { cn } from '#lib/utils'
import type { ReactNode } from 'react'

const PLATFORMS = {
  facebook: {
    icon: FacebookIcon,
    iconClassName: 'text-[#1877F2]',
    iconContainerClassName: 'bg-[#E7F0FF]',
  },
  instagram: {
    icon: InstagramIcon,
    iconClassName: 'text-[#E4405F]',
    iconContainerClassName: 'bg-[#FDE8EF]',
  },
  linkedin: {
    icon: LinkedInIcon,
    iconClassName: 'text-[#0A66C2]',
    iconContainerClassName: 'bg-[#E8F0F8]',
  },
} as const

export type RevenuePlatform = keyof typeof PLATFORMS

export type RevenueItemProps = {
  amount?: string
  label?: string
  platform?: RevenuePlatform
  icon?: ReactNode
  className?: string
  iconContainerClassName?: string
  iconClassName?: string
}

export function RevenueItem({
  amount = '$4,000',
  label = 'Recently Added Pages',
  platform = 'facebook',
  icon,
  className,
  iconContainerClassName,
  iconClassName,
}: RevenueItemProps) {
  const {
    icon: PlatformIcon,
    iconClassName: platformIconClass,
    iconContainerClassName: platformContainerClass,
  } = PLATFORMS[platform]

  return (
    <article
      className={cn(
        'flex items-center justify-between gap-4 rounded-[12px] border border-[#F1F1F1] px-4 py-2',
        className,
      )}
    >
      <div className='min-w-0 flex flex-col'>
        <p className='text-lg font-semibold leading-tight text-[#3B3B45]'>
          {amount}
        </p>
        <p className='mt-0.5 text-xs font-normal text-[#A3A3A6]'>{label}</p>
      </div>

      <div
        className={cn(
          'flex size-12 shrink-0 items-center justify-center rounded-full cursor-pointer',
          platformContainerClass,
          iconContainerClassName,
        )}
        aria-hidden
      >
        {icon ?? (
          <PlatformIcon
            className={cn('size-5 ', platformIconClass, iconClassName)}
          />
        )}
      </div>
    </article>
  )
}
