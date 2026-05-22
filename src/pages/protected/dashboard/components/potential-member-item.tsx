import { ArrowUpIcon, ThreadIcon } from '@/assets/svg'
import { cn } from '#lib/utils'
import type { PotentialMemberData } from '@/utils/overview-data'

export function PotentialMemberItem({
  name,
  handle,
  growth,
  avatar,
  className,
}: PotentialMemberData & { className?: string }) {
  return (
    <article
      className={cn(
        'flex min-w-[140px] flex-1 flex-col items-center rounded-xl border border-[#F1F1F1] bg-white px-3 py-4 sm:min-w-0 sm:px-4',
        className,
      )}
    >
      <div className='size-10 overflow-hidden rounded-full bg-[#F1F1F1]'>
        <img src={avatar} alt={name} className='size-full object-cover' />
      </div>
      <h3 className='mt-3 text-center text-sm font-bold leading-tight text-[#3B3B45]'>
        {name}
      </h3>
      <p className='mt-1 text-center text-xs text-[#A3A3A6]'>{handle}</p>
      <div className='mt-2 flex items-center gap-1'>
        <ThreadIcon className='size-5 text-[#35DB95]' />
        <span className='text-[16px] font-bold text-[#3B3B45] ml-1'>
          {growth}
        </span>
      </div>
    </article>
  )
}
