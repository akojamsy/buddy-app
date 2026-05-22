import pdfPlaceholder from '@/assets/images/pdf-placeholder.png'
import {
  HeartOutlineIcon2,
  NotificationIcon2,
  SearchIcon,
  SendIcon,
} from '@/assets/svg'
import { cn } from '#lib/utils'
import {
  selectSentMessagesForThread,
  sendMessage,
} from '@/redux/features/messages/messagesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { Camera, Mic, Paperclip, Smile } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  getConversationForThread,
  PROJECT_REPORT_PDF_URL,
  type ChatMessage,
  type MessageThreadData,
} from '@/utils/messages-data'

type AttachmentMessage = Extract<ChatMessage, { content: 'attachment' }>

type MessageConversationProps = {
  thread: MessageThreadData
}

function DateSeparator({ label }: { label: string }) {
  return (
    <div className='flex items-center gap-3 py-2'>
      <span className='h-px flex-1 bg-[#E8E8ED]' />
      <span className='text-[11px] font-normal text-[#CDCDCD]'>{label}</span>
      <span className='h-px flex-1 bg-[#E8E8ED]' />
    </div>
  )
}

function PdfAttachment({ fileName, url }: { fileName: string; url: string }) {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`Open ${fileName}`}
      className='block cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8600]/40 focus-visible:ring-offset-2'
    >
      <div className='flex h-fit items-center justify-center overflow-hidden bg-[#F5F5F5]'>
        <img
          src={pdfPlaceholder}
          alt='Project Status Report preview'
          draggable={false}
          className=' object-contain'
        />
      </div>
      <p className='px-3 py-2.5 text-[13px] font-medium leading-none text-[#3B3B45]'>
        {fileName}
      </p>
    </a>
  )
}

function ChatMessage({
  message,
  contactAvatar,
  contactName,
  userAvatar,
}: {
  message: ChatMessage
  contactAvatar: string
  contactName: string
  userAvatar: string
}) {
  if (message.type === 'date-separator') {
    return <DateSeparator label={message.label} />
  }

  const isIncoming = message.type === 'incoming'
  const isAttachment = message.content === 'attachment'
  const isOutgoing =
    message.type === 'outgoing' && message.variant === 'outgoing-muted'

  return (
    <div
      className={cn(
        'flex items-end gap-2 mt-1',
        isIncoming ? 'justify-start' : 'justify-end',
      )}
    >
      {isIncoming && (
        <div className='size-[25px] shrink-0 overflow-hidden rounded-full bg-[#E8E8ED]'>
          <img
            src={contactAvatar}
            alt={contactName}
            className='size-full object-cover'
          />
        </div>
      )}

      <div
        className={cn(
          'max-w-[200px] leading-[100%] text-[16px] font-normal',
          isIncoming &&
            !isAttachment &&
            'bg-[#EFEFEF] px-[11px] py-[12.38px] text-[#2E2E2E] rounded-r-[12px] rounded-tl-[12px]',
          isIncoming &&
            isAttachment &&
            'overflow-hidden bg-[#EFEFEF] text-[#2E2E2E] rounded-r-[12px] rounded-tl-[12px]',
          message.type === 'outgoing' &&
            !isOutgoing &&
            'bg-[#F1F1F1] px-[11px] py-[12.38px] text-[#FF8600] rounded-l-[12px] rounded-tr-[12px] font-medium',
        )}
      >
        {isAttachment ? (
          <PdfAttachment
            fileName={(message as AttachmentMessage).fileName}
            url={(message as AttachmentMessage).url ?? PROJECT_REPORT_PDF_URL}
          />
        ) : (
          <p className='text-[13px] leading-[1.4]'>{message.content}</p>
        )}
      </div>

      {message.type === 'outgoing' && (
        <div className='size-[25px] shrink-0 overflow-hidden rounded-full bg-[#E8E8ED]'>
          <img
            src={userAvatar}
            alt='David Peters'
            className='size-full object-cover'
          />
        </div>
      )}
    </div>
  )
}

export function MessageConversation({ thread }: MessageConversationProps) {
  const dispatch = useAppDispatch()
  const [message, setMessage] = useState('')
  const sentMessages = useAppSelector((state) =>
    selectSentMessagesForThread(state, thread.id),
  )

  const {
    contactAvatar,
    contactName,
    userAvatar,
    messages: baseMessages,
  } = getConversationForThread(thread)

  const messages = useMemo(
    () => [...baseMessages, ...sentMessages],
    [baseMessages, sentMessages],
  )

  const handleSend = () => {
    const trimmed = message.trim()
    if (!trimmed) return

    dispatch(sendMessage({ threadId: thread.id, content: trimmed }))
    setMessage('')
  }

  return (
    <div className='flex min-h-0 flex-1 flex-col rounded-[12px] bg-[#FAFAFA] px-[40px] py-[39px]'>
      <header className='flex items-center justify-between border-b border-[#E8E8ED] pb-4'>
        <div className='flex items-center gap-3'>
          <div className='relative shrink-0'>
            <div className='size-[45px] overflow-hidden rounded-full bg-[#E8E8ED]'>
              <img
                src={contactAvatar}
                alt={contactName}
                className='size-full object-cover'
              />
            </div>
            <span className='absolute bottom-0 left-0 size-[15px] rounded-full border-2 border-white bg-[#33EC23]' />
          </div>
          <h2 className='text-[15px] font-semibold leading-[100%] text-[#2E2E2E]'>
            {contactName}
          </h2>
        </div>

        <div className='flex items-center gap-[15px] text-[#A0A0AB]'>
          <button
            type='button'
            aria-label='Search conversation'
            className='cursor-pointer hover:text-[#8D8D8D]'
          >
            <SearchIcon
              className='size-[24px] text-[#8D8D8D]'
              strokeWidth={1.5}
            />
          </button>
          <button
            type='button'
            aria-label='Favorite conversation'
            className='cursor-pointer hover:text-[#8D8D8D]'
          >
            <HeartOutlineIcon2
              className='size-[20px] text-[#8D8D8D]'
              strokeWidth={1.5}
            />
          </button>
          <button
            type='button'
            aria-label='Conversation notifications'
            className='cursor-pointer hover:text-[#8D8D8D]'
          >
            <NotificationIcon2
              className='size-[20px] text-[#8D8D8D]'
              strokeWidth={1.5}
            />
          </button>
        </div>
      </header>

      <div className='flex flex-1 flex-col gap-3.5 overflow-y-auto py-8'>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            contactAvatar={contactAvatar}
            contactName={contactName}
            userAvatar={userAvatar}
          />
        ))}
      </div>

      <footer className='rounded-[12px] bg-[#D9D9D9] py-7 pr-8 pl-10 shadow-[0_-2px_15px_0_rgba(0,0,0,0.1)]'>
        <form
          className='flex items-center gap-3'
          onSubmit={(event) => {
            event.preventDefault()
            handleSend()
          }}
        >
          <div className='relative min-w-0 flex-1'>
            <Mic
              className='pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[#A0A0AB]'
              strokeWidth={1.75}
            />
            <input
              type='text'
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder='Write Something...'
              aria-label='Write a message'
              className='h-10 w-full rounded-full border-[#FF8600] bg-white pr-28 pl-12 text-sm text-[#3B3B45] outline-none placeholder:text-[#BDBDBD] focus-visible:border'
            />
            <div className='absolute top-1/2 right-4 flex -translate-y-1/2 cursor-pointer items-center gap-2.5 text-[#A0A0AB]'>
              <Paperclip className='size-5 cursor-pointer' strokeWidth={1.75} />
              <Camera className='size-5 cursor-pointer' strokeWidth={1.75} />
              <Smile className='size-5 cursor-pointer' strokeWidth={1.75} />
            </div>
          </div>
          <button
            type='submit'
            aria-label='Send message'
            disabled={!message.trim()}
            className='flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#FF8600] text-white hover:bg-[#E67800] disabled:cursor-not-allowed disabled:opacity-50'
          >
            <SendIcon className='size-6' fill='white' strokeWidth={0} />
          </button>
        </form>
      </footer>
    </div>
  )
}
