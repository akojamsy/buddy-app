import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SentChatMessage = {
  id: string
  type: 'outgoing'
  content: string
  variant?: 'default' | 'outgoing-muted'
}

type MessagesState = {
  sentByThread: Record<string, SentChatMessage[]>
}

const initialState: MessagesState = {
  sentByThread: {},
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendMessage: (
      state,
      action: PayloadAction<{ threadId: string; content: string }>,
    ) => {
      const { threadId, content } = action.payload
      const message: SentChatMessage = {
        id: `sent-${threadId}-${Date.now()}`,
        type: 'outgoing',
        content,
      }

      if (!state.sentByThread[threadId]) {
        state.sentByThread[threadId] = []
      }

      state.sentByThread[threadId].push(message)
    },
  },
})

export const { sendMessage } = messagesSlice.actions
export const messagesSliceReducer = messagesSlice.reducer

export const selectSentMessagesForThread = (
  state: { messages?: MessagesState },
  threadId: string,
): SentChatMessage[] => state.messages?.sentByThread[threadId] ?? []
