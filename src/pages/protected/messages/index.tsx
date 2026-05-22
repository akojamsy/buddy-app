import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '#components/ui/avatar'
import { Input } from '#components/ui/input'
import { EditIcon, SearchIcon2 } from '@/assets/svg'
import man1Avatar from '@/assets/images/man1.jpg'
import { MESSAGE_THREADS } from '@/utils/messages-data'
import { MessageConversation } from './components/message-conversation'
import { MessageThreadItem } from './components/message-thread-item'
import DashboardLayout from '../app-layout'

const Messages = () => {
  const [activeThreadId, setActiveThreadId] = useState(MESSAGE_THREADS[0].id)
  const activeThread =
    MESSAGE_THREADS.find((thread) => thread.id === activeThreadId) ??
    MESSAGE_THREADS[0]

  return (
    <DashboardLayout pageTitle='Messages'>
      <section className='font-inter w-full flex flex-col md:flex-row gap-4 bg-white px-4 py-8 rounded-[0.75rem] h-full overflow-y-hidden'>
        <aside className='w-full md:w-74 rounded-[0.75rem] bg-[#FAFAFA] flex flex-col p- h-full overflow-y-hidden'>
          <div className='flex flex-col gap-6.5 border-b border-[#CDCDCD] pb-6.5 mb-6.5'>
            <div className='flex items-start justify-between pr-[3.5px]'>
              <div className='flex items-center gap-[9.21px] px-[3.5px] '>
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
                  <p className='text-[9px] font-semibold leading-[100%] text-[#3B3B45] mt-[3px]'>
                    Senior Developer
                  </p>
                </div>
              </div>
              <button
                type='button'
                aria-label='Edit profile'
                className='shrink-0 cursor-pointer text-[#3B3B45] hover:text-[#FF8600] mt-[3.5px]'
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
          </div>
          <div className='flex flex-col gap-5 border-b border-[#CDCDCD] px-1 pb-8 h-full overflow-y-auto '>
            {MESSAGE_THREADS.map((thread) => (
              <MessageThreadItem
                key={thread.id}
                {...thread}
                isActive={activeThreadId === thread.id}
                onSelect={() => setActiveThreadId(thread.id)}
              />
            ))}
          </div>
        </aside>
        <section className='flex w-full flex-1 flex-col'>
          <MessageConversation thread={activeThread} />
        </section>
      </section>
    </DashboardLayout>
  )
}

export default Messages
