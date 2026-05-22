import { Avatar, AvatarFallback, AvatarImage } from '#components/ui/avatar'
import { Input } from '#components/ui/input'
import { EditIcon, SearchIcon2 } from '@/assets/svg'
import man1Avatar from '@/assets/images/man1.jpg'
import type { MessageThreadData } from '@/utils/messages-data'
import { MessageThreadItem } from './message-thread-item'

type MessageThreadsPanelProps = {
  threads: MessageThreadData[]
  activeThreadId: string
  onSelectThread: (threadId: string) => void
}

export function MessageThreadsPanel({
  threads,
  activeThreadId,
  onSelectThread,
}: MessageThreadsPanelProps) {
  return (
    <div className='flex h-full min-h-0 flex-col'>
      <div className='flex shrink-0 flex-col gap-6.5 border- border-[#CDCDCD] p-4.5 pb-6.5'>
        <div className='flex items-start justify-between pr-[3.5px]'>
          <div className='flex items-center gap-[9.21px] px-[3.5px]'>
            <Avatar className='size-11 shrink-0 border-0 after:hidden'>
              <AvatarImage src={man1Avatar} alt='David Peters' />
              <AvatarFallback className='bg-[#E8E8ED] text-[#3B3B45]'>
                DP
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0 flex-1'>
              <p className='text-[15px] font-semibold leading-[100%] text-[#FF8600]'>
                David Peters
              </p>
              <p className='mt-[3px] text-[9px] font-semibold leading-[100%] text-[#3B3B45]'>
                Senior Developer
              </p>
            </div>
          </div>
          <button
            type='button'
            aria-label='Edit profile'
            className='mt-[3.5px] shrink-0 cursor-pointer text-[#3B3B45] hover:text-[#FF8600]'
          >
            <EditIcon className='size-[17px]' />
          </button>
        </div>
        <Input
          type='search'
          placeholder='Search Here...'
          aria-label='Search messages'
          leftIcon={{
            icon: SearchIcon2,
            className: 'size-6 text-[#CDCDCD]',
          }}
          className='h-10 w-full rounded-full border-0 bg-white pl-12 text-sm text-[#3B3B45] shadow-none placeholder:text-[#BDBDBD] placeholder:text-[15px] focus-visible:border-0 focus-visible:ring-0'
        />
        <hr />
      </div>
      <div className='flex min-h-0 flex-1 flex-col items-center gap-5 overflow-y-auto border-b border-[#CDCDCD] px-1 pb-8'>
        {threads.map((thread) => (
          <MessageThreadItem
            key={thread.id}
            {...thread}
            isActive={activeThreadId === thread.id}
            onSelect={() => onSelectThread(thread.id)}
          />
        ))}
      </div>
    </div>
  )
}
