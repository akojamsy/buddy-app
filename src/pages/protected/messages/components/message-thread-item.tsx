import { CheckIcon } from '@/assets/svg'
import { cn } from '#lib/utils'
import type { MessageThreadData } from '@/utils/messages-data'

type MessageThreadItemProps = Omit<MessageThreadData, 'isActive'> & {
  isActive: boolean
  onSelect: () => void
  className?: string
}

export function MessageThreadItem({
  name,
  preview,
  time,
  avatar,
  isActive,
  unreadCount,
  isRead,
  onSelect,
  className,
}: MessageThreadItemProps) {
  return (
    <button
      type='button'
      onClick={onSelect}
      aria-current={isActive ? 'true' : undefined}
      className={cn(
        'flex w-full cursor-pointer items-center px-2.5 py-[5px] text-left md:w-[265px]',
        isActive &&
          'rounded-[12px] bg-white shadow-[0_14px_25px_0_rgba(30,30,30,0.1)]',
        className,
      )}
    >
      <div className='size-[2.813rem] shrink-0 overflow-hidden rounded-full bg-[#E8E8ED] mr-[7px]'>
        <img src={avatar} alt={name} className='size-full object-cover' />
      </div>

      <div className='min-w-0 flex-1'>
        <p className='text-sm font-semibold leading-[100%] text-[#FF8600]'>
          {name}
        </p>
        <p className='mt-[3px] text-[9px] font-normal leading-[100%] text-[#959595] line-clamp-2'>
          {preview}
        </p>
      </div>

      <div className='flex shrink-0 flex-col items-end gap-2'>
        <span className='text-[9px] font-normal leading-[100%] text-[#CDCDCD]'>
          {time}
        </span>
        {!isActive &&
          (unreadCount != null && unreadCount > 0 ? (
            <span className='inline-flex size-[18px] items-center justify-center rounded-full bg-[#FF8600] text-[10px] font-semibold leading-none text-white'>
              {unreadCount}
            </span>
          ) : isRead ? (
            <span className='inline-flex size-[18px] items-center justify-center rounded-full bg-[#E8F4FF]'>
              <CheckIcon className='size-2.5 [&_path]:fill-[#2F80ED]' />
            </span>
          ) : null)}
      </div>
    </button>
  )
}
