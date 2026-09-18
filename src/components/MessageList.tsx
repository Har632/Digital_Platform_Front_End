import { Bot, Check, Copy, ThumbsDown, ThumbsUp } from 'lucide-react'
import type { UIMessage } from 'ai'

type MessageListProps = {
  messages: UIMessage[]
  copiedMessageId: string | null
  onCopy: (id: string, text: string) => void
  isStreaming: boolean
}

export function MessageList({ messages, copiedMessageId, onCopy, isStreaming }: MessageListProps) {
  return <div className="messages">{messages.length === 0 ? null : messages.map((message) => {
    const text = message.parts.filter((part) => part.type === 'text').map((part) => part.text).join('')
    return <div className={`message-row ${message.role === 'user' ? 'user-row' : ''}`} key={message.id}>{message.role !== 'user' && <div className="message-avatar"><Bot size={17} /></div>}<div className="message-content"><div className="message-bubble">{text}</div>{message.role === 'assistant' && text && <div className="message-actions"><button title="Copy" type="button" onClick={() => onCopy(message.id, text)}>{copiedMessageId === message.id ? <Check size={14} /> : <Copy size={14} />}</button><button title="Helpful" type="button"><ThumbsUp size={14} /></button><button title="Not helpful" type="button"><ThumbsDown size={14} /></button></div>}</div></div>
  })}{isStreaming && <div className="typing"><span /><span /><span /></div>}</div>
}