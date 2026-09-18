import { DefaultChatTransport } from 'ai'

export const AI_CHAT_ENDPOINT = '/api/chat'

export const aiChatTransport = new DefaultChatTransport({
	api: AI_CHAT_ENDPOINT,
})