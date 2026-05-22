import { GoldMessageIcon, RedoIcon } from '@/assets/svg'
import { cn } from '#lib/utils'
import { Heart } from 'lucide-react'
import type { ReactNode } from 'react'

export type TrendingPostItemData = {
  title: string
  excerpt: string
  likes: number
  comments: number
  shares: number
}

type StatBadgeProps = {
  icon: ReactNode
  value: number
}

function StatBadge({ icon, value }: StatBadgeProps) {
  return (
    <span className='inline-flex items-center gap-1.5 rounded-full bg-[#F6F6F6] px-2.5 py-1 text-sm font-medium text-[#3B3B45]'>
      {icon}
      {value}
    </span>
  )
}

export function TrendingPostItem({
  title,
  excerpt,
  likes,
  comments,
  shares,
  className,
}: TrendingPostItemData & { className?: string }) {
  return (
    <article
      className={cn(
        'group flex h-full cursor-pointer flex-col rounded-[12px] border border-[#F1F1F1] bg-white p-4',
        className,
      )}
    >
      <h3 className='text-sm font-semibold leading-[140%] text-[#3B3B45] group-hover:underline sm:text-lg'>
        {title}
      </h3>
      <p className='mt-2 line-clamp-2 flex-1 text-sm font-light leading-[150%] text-[#818187]'>
        {excerpt}
      </p>
      <div className='mt-5 flex flex-wrap gap-3'>
        <StatBadge
          icon={<Heart className='size-3.5 fill-[#E53935] text-[#E53935]' />}
          value={likes}
        />
        <StatBadge
          icon={<GoldMessageIcon className='size-4 shrink-0' />}
          value={comments}
        />
        <StatBadge
          icon={<RedoIcon className='size-4 shrink-0' />}
          value={shares}
        />
      </div>
    </article>
  )
}
