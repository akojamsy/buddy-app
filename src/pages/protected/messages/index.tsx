import { Sheet, SheetContent } from '#components/ui/sheet'
import { useState } from 'react'
import { MESSAGE_THREADS } from '@/utils/messages-data'
import { MessageConversation } from './components/message-conversation'
import { MessageThreadsPanel } from './components/message-threads-panel'
import DashboardLayout from '../app-layout'

const Messages = () => {
  const [activeThreadId, setActiveThreadId] = useState(MESSAGE_THREADS[0].id)
  const [threadsOpen, setThreadsOpen] = useState(false)
  const activeThread =
    MESSAGE_THREADS.find((thread) => thread.id === activeThreadId) ??
    MESSAGE_THREADS[0]

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId)
    setThreadsOpen(false)
  }

  const threadsPanel = (
    <MessageThreadsPanel
      threads={MESSAGE_THREADS}
      activeThreadId={activeThreadId}
      onSelectThread={handleSelectThread}
    />
  )

  return (
    <DashboardLayout pageTitle='Messages' innerClassName='flex min-h-0 flex-col'>
      <section className='font-inter relative flex min-h-0 flex-1 flex-col gap-4 overflow-hidden rounded-[0.75rem] bg-white px-4 py-8 md:flex-row max-md:h-[calc(100dvh-11rem)]'>
        <aside className='hidden min-h-0 w-74 flex-col overflow-hidden rounded-[0.75rem] bg-[#FAFAFA] md:flex'>
          {threadsPanel}
        </aside>

        <Sheet open={threadsOpen} onOpenChange={setThreadsOpen}>
          <SheetContent
            side='left'
            showCloseButton={false}
            className='flex h-full w-[min(18rem,85vw)] max-w-[18rem] flex-col gap-0 overflow-hidden border-r-0 bg-[#FAFAFA] p-0'
          >
            <div className='flex h-full min-h-0 flex-col'>{threadsPanel}</div>
          </SheetContent>
        </Sheet>

        <section className='flex min-h-0 w-full flex-1 flex-col'>
          <MessageConversation
            thread={activeThread}
            onOpenThreads={() => setThreadsOpen(true)}
          />
        </section>
      </section>
    </DashboardLayout>
  )
}

export default Messages
