import lady1Avatar from '@/assets/images/lady1.avif'
import lady2Avatar from '@/assets/images/lady2.webp'
import lady3Avatar from '@/assets/images/lady3.webp'
import man1Avatar from '@/assets/images/man1.jpg'
import man2Avatar from '@/assets/images/man2.jpeg'
import man3Avatar from '@/assets/images/man3.jpg'

export const LISA_ROY_THREAD_ID = 'lisa-roy'

export const PROJECT_REPORT_PDF_URL = '/project_report.pdf'

export const CURRENT_USER_AVATAR = man1Avatar

export type MessageThreadData = {
  id: string
  name: string
  preview: string
  time: string
  avatar: string
  unreadCount?: number
  isRead?: boolean
}

export const MESSAGE_THREADS: MessageThreadData[] = [
  {
    id: 'lisa-roy',
    name: 'Lisa Roy',
    preview: 'Hi, are you Available Tomorrow?',
    time: '10:35 AM',
    avatar: lady1Avatar,
  },
  {
    id: 'jamie-taylor',
    name: 'Jamie Taylor',
    preview: 'Nice One. Will Do it tommorow',
    time: '10:35 AM',
    avatar: man2Avatar,
    unreadCount: 3,
  },
  {
    id: 'jason-roy',
    name: 'Jason Roy',
    preview: 'That’s Great. I am Looking forward to having a great start.',
    time: '10:35 AM',
    avatar: man1Avatar,
    isRead: true,
  },
  {
    id: 'amy-frost',
    name: 'Amy Frost',
    preview: 'Hi, will you start working on the chat app right now?',
    time: '10:35 AM',
    avatar: lady2Avatar,
    isRead: true,
  },
  {
    id: 'paul-wilson',
    name: 'Paul Wilson',
    preview: 'See you tommorow champ',
    time: '10:35 AM',
    avatar: man3Avatar,
    isRead: true,
  },
  {
    id: 'ana-williams',
    name: 'Ana Williams',
    preview: '??',
    time: '10:35 AM',
    avatar: lady3Avatar,
    unreadCount: 1,
  },
]

export type ChatMessage =
  | {
      id: string
      type: 'incoming' | 'outgoing'
      content: string
      variant?: 'default' | 'outgoing-muted'
    }
  | {
      id: string
      type: 'incoming'
      content: 'attachment'
      fileName: string
      url?: string
    }
  | {
      id: string
      type: 'date-separator'
      label: string
    }

export type ConversationData = {
  contactAvatar: string
  contactName: string
  userAvatar: string
  messages: ChatMessage[]
}

export const THREAD_CONVERSATIONS: Record<string, ConversationData> = {
  'lisa-roy': {
    contactAvatar: lady1Avatar,
    contactName: 'Lisa Roy',
    userAvatar: man1Avatar,
    messages: [
      {
        id: '1',
        type: 'incoming',
        content: 'Hi David, have you got the project report pdf?',
      },
      {
        id: '2',
        type: 'outgoing',
        content: 'NO. I did not get it',
      },
      {
        id: '3',
        type: 'date-separator',
        label: 'Yesterday',
      },
      {
        id: '4',
        type: 'incoming',
        content:
          'Ok, I will just sent it here. Plz be sure to fill the details by today end of the day.',
      },
      {
        id: '5',
        type: 'incoming',
        content: 'attachment',
        fileName: 'project_report.pdf',
        url: PROJECT_REPORT_PDF_URL,
      },

      {
        id: '6',
        type: 'outgoing',
        content:
          'Ok. Should I send it over email as well after filling the details.',
      },

      {
        id: '8',
        type: 'incoming',
        content: "Ya. I'll be adding more team members to it.",
      },
      {
        id: '9',
        type: 'outgoing',
        content: 'OK',
      },
    ],
  },
  'jamie-taylor': {
    contactAvatar: man2Avatar,
    contactName: 'Jamie Taylor',
    userAvatar: man1Avatar,
    messages: [
      {
        id: '1',
        type: 'incoming',
        content: 'Can you review the API changes before standup?',
      },
      {
        id: '2',
        type: 'outgoing',
        content: 'Sure, I will take a look this afternoon.',
      },
      {
        id: '3',
        type: 'incoming',
        content: 'Nice One. Will Do it tommorow',
      },
    ],
  },
  'jason-roy': {
    contactAvatar: man1Avatar,
    contactName: 'Jason Roy',
    userAvatar: man1Avatar,
    messages: [
      {
        id: '1',
        type: 'incoming',
        content: 'Welcome aboard! Excited to have you on the team.',
      },
      {
        id: '2',
        type: 'outgoing',
        content: 'Thanks Jason, really appreciate the warm welcome.',
      },
      {
        id: '3',
        type: 'incoming',
        content: 'That’s Great. I am Looking forward to having a great start.',
      },
    ],
  },
  'amy-frost': {
    contactAvatar: lady2Avatar,
    contactName: 'Amy Frost',
    userAvatar: man1Avatar,
    messages: [
      {
        id: '1',
        type: 'incoming',
        content: 'Hi, will you start working on the chat app right now?',
      },
      {
        id: '2',
        type: 'outgoing',
        content: 'Yes, I can start after the current sprint tasks.',
      },
    ],
  },
  'paul-wilson': {
    contactAvatar: man3Avatar,
    contactName: 'Paul Wilson',
    userAvatar: man1Avatar,
    messages: [
      {
        id: '1',
        type: 'outgoing',
        content: 'Good game today, same time next week?',
      },
      {
        id: '2',
        type: 'incoming',
        content: 'See you tommorow champ',
      },
    ],
  },
  'ana-williams': {
    contactAvatar: lady3Avatar,
    contactName: 'Ana Williams',
    userAvatar: man1Avatar,
    messages: [
      {
        id: '1',
        type: 'incoming',
        content: 'Did you get my last message about the design specs?',
      },
      {
        id: '2',
        type: 'outgoing',
        content: '??',
        variant: 'outgoing-muted',
      },
    ],
  },
}

export function getConversationForThread(
  thread: MessageThreadData,
): ConversationData {
  return (
    THREAD_CONVERSATIONS[thread.id] ?? {
      contactAvatar: thread.avatar,
      contactName: thread.name,
      userAvatar: CURRENT_USER_AVATAR,
      messages: [
        {
          id: '1',
          type: 'incoming',
          content: thread.preview,
        },
      ],
    }
  )
}
